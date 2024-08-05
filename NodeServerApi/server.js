const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');
const Role = require('./models/role');
const Utilisateur = require('./models/utilisateur');
const Categorie = require('./models/categorie');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
