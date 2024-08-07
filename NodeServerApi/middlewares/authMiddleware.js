const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    console.log('Checking token...');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.error('Unauthorized: Token is missing.');
        return res.status(401).json({ error: "Unauthorized: Token is missing." });
    }

    jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, user) => {
        if (err) {
            console.error('Unauthorized: Invalid token.');
            return res.status(403).json({ error: "Unauthorized: Invalid token." });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
