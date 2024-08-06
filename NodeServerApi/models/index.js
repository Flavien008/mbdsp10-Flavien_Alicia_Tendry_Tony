const sequelize = require('../config/database');
const Utilisateur = require('./utilisateur');
const Role = require('./role');
const Poste = require('./poste');
const Postedetails = require('./postedetails');
const Objet = require('./objet');
const Categorie = require('./categorie');

// Import all models
const models = {
    Utilisateur,
    Role,
    Poste,
    Postedetails,
    Objet,
    Categorie
};

// Define associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Synchronize models in the correct order
async function syncModels() {
    try {
        // Synchronize base tables first
        await Role.sync({ force: true });
        await Categorie.sync({ force: true });
        await Utilisateur.sync({ force: true });
        await Poste.sync({ force: true });
        await Objet.sync({ force: true });
        await Postedetails.sync({ force: true });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

syncModels();

const db = {
    ...models,
    sequelize
};

module.exports = db;
