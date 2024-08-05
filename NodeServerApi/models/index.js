const sequelize = require('../config/database');
const Utilisateur = require('./utilisateur');
const Poste = require('./poste');
const Postedetails = require('./postedetails');
const Objet = require('./objet');

// Importer tous les modèles
const models = {
    Utilisateur,
    Poste,
    Postedetails,
    Objet
};

// Définir les associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

const db = {
    ...models,
    sequelize
};

module.exports = db;
