const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/utilisateur');

exports.signup = async (req, res) => {
    const { username, email, dateNaissance, role_id, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Utilisateur.create({ username, email, dateNaissance, role_id, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Utilisateur.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.user_id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
