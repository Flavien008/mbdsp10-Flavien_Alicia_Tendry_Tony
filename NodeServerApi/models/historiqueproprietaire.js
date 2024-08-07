const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Utilisateur = require('./utilisateur');
const Objet = require('./objet');

const HistoriqueProprietaire = sequelize.define('HistoriqueProprietaire', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    objet_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Objet,
            key: 'item_id'
        }
    },
    ancien_proprietaire_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: 'user_id'
        }
    },
    nouveau_proprietaire_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: 'user_id'
        }
    },
    date_changement: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

HistoriqueProprietaire.belongsTo(Objet, { foreignKey: 'objet_id' });
HistoriqueProprietaire.belongsTo(Utilisateur, { as: 'AncienProprietaire', foreignKey: 'ancien_proprietaire_id' });
HistoriqueProprietaire.belongsTo(Utilisateur, { as: 'NouveauProprietaire', foreignKey: 'nouveau_proprietaire_id' });

module.exports = HistoriqueProprietaire;
