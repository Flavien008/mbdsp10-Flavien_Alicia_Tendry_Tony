let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let userroutes = require('./routes/user-routes');
let mailroutes = require('./routes/mail');
const auth = require('./middlewares/authMiddleware');
let mongoose = require('mongoose');
let { Pool } = require('pg');

// MongoDB setup
mongoose.Promise = global.Promise;

const mongoUri = 'mongodb+srv://mean:mean1234@cluster0.tstxgfw.mongodb.net/MBDSM2?retryWrites=true&w=majority';
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(mongoUri, mongoOptions)
    .then(() => {
        console.log("Connecté à la base MongoDB assignments dans le cloud !");
        console.log("at URI = " + mongoUri);
        // console.log("vérifiez with http://localhost:" + port + "/api/assignments que cela fonctionne")
    },
        err => {
            console.log('Erreur de connexion: ', err);
        });

// PostgreSQL setup
const pgPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'boutique',
    password: 'root',
    port: 5432,
});

pgPool.connect()
    .then(() => {
        console.log("Connecté à la base PostgreSQL !");
    })
    .catch(err => {
        console.log('Erreur de connexion PostgreSQL: ', err);
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

// Obligatoire si déploiement dans le cloud !
let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/signup')
    .post(userroutes.signup);

app.route(prefix + '/login')
    .post(userroutes.login);


app.route(prefix + '/sendmail')
    .post(auth, mailroutes.sendMail);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);


pgPool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Erreur de requête:', err);
    } else {
        console.log('Résultat de la requête:', res.rows);
    }
});

module.exports = app;
