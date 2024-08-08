const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/user-routes');
const roleRoutes = require('./routes/role-routes');
const categorieRoutes = require('./routes/categorie-routes');
const objetRoutes = require('./routes/objet-routes');
const posteRoutes = require('./routes/poste-routes');
const commentaireRoutes = require('./routes/commentaire-routes');
const notificationRoutes = require('./routes/notification-routes');
const echangeRoutes = require('./routes/echange-routes');
const historiqueRoutes = require('./routes/historiqueproprietaire-routes');
const authenticateToken = require('./middlewares/authMiddleware');

const connectDB = require('./config/mongo');

// CORS Middleware
app.use(cors());

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

connectDB();

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error synchronizing the database:', error);
    });

const prefix = '/api';

app.use(prefix + '/users', userRoutes);
app.use(prefix + '/roles', authenticateToken, roleRoutes);
app.use(prefix + '/categories', authenticateToken, categorieRoutes);
app.use(prefix + '/objets', authenticateToken, objetRoutes);
app.use(prefix + '/postes', authenticateToken, posteRoutes);
app.use(prefix + '/commentaires', authenticateToken, commentaireRoutes);
app.use(prefix + '/notifications', authenticateToken, notificationRoutes);
app.use(prefix + '/echanges', authenticateToken, echangeRoutes);
app.use(prefix + '/historique', authenticateToken, historiqueRoutes);

let port = process.env.PORT || 8010;

// On démarre le serveur
app.listen(port, "0.0.0.0", () => {
    console.log('Serveur démarré sur http://localhost:' + port);
});

module.exports = app;
