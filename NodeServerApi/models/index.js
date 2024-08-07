const sequelize = require('../config/database');
const Utilisateur = require('./utilisateur');
const Role = require('./role');
const Poste = require('./poste');
const Postedetails = require('./postedetails');
const Objet = require('./objet');
const Categorie = require('./categorie');
const Echange = require('./echange');
const EchangeDetail = require('./echangedetails');
const HistoriqueProprietaire = require('./historiqueproprietaire');

// Import all models
const models = {
    Utilisateur,
    Role,
    Poste,
    Postedetails,
    Objet,
    Categorie,
    Echange,
    EchangeDetail,
    HistoriqueProprietaire
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
        await Role.sync({ alter: true });
        await Categorie.sync({ alter: true });
        await Utilisateur.sync({ alter: true });
        await Poste.sync({ alter: true });
        await Objet.sync({ alter: true });
        await Postedetails.sync({ alter: true });
        await Echange.sync({ alter: true });
        await EchangeDetail.sync({ alter: true });
        await HistoriqueProprietaire.sync({ alter: true });
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
