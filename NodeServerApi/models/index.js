const sequelize = require('../config/database');
const Utilisateur = require('./utilisateur');
const Poste = require('./poste');
const Postedetails = require('./postedetails');
const Objet = require('./objet');
const Categorie = require('./categorie'); 

// Importer tous les modèles
const models = {
    Utilisateur,
    Poste,
    Postedetails,
    Objet,
    Categorie
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
