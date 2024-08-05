let User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
        // Exclure le champ 'password' de l'objet 'user' renvoyé dans la réponse
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ message: 'Login successful', token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Récupérer un User par son id (GET)
function getUser(req, res) {
    let userId = req.params.id;
    User.findById(userId, (err, User) => {
        if (err) { res.send(err) }
        res.json(User);
    })

}

async function signup(req, res) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10); // Use a higher salt rounds value, e.g., 10
        req.body.password = hash;
        let user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.name = req.body.name;
        user.role = req.body.role;
        user.matricule = req.body.matricule;

        if (req.body.role == null) req.body.role = 'student';

        console.log("POST User reçu :");
        console.log(user)

        user.save((err) => {
            if (err) {
                res.send('cant post user ', err);
            }
            console.log({ message: `${user.name} saved!` })
            res.status(200).json(user);
        })
    } catch (error) {
        console.error(error);
        res.status(501).json(error);
    }
}

module.exports = { signup, login }; 
