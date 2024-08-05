const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/user-routes');
const roleRoutes = require('./routes/role-routes');
const categorieRoutes = require('./routes/categorie-routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


const prefix = '/api';

app.use(prefix+'/users', userRoutes);
app.use(prefix+'/roles', roleRoutes);
app.use(prefix+'/categories', categorieRoutes);

let port = process.env.PORT || 8010;

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;