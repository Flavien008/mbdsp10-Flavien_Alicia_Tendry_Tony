const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HistoriqueProprietaire = sequelize.define('HistoriqueProprietaire', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    objet_id: {
        type: DataTypes.INTEGER,
    },
    ancien_proprietaire_id: {
        type: DataTypes.INTEGER,
    },
    nouveau_proprietaire_id: {
        type: DataTypes.INTEGER,
    },
    date_changement: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});


module.exports = HistoriqueProprietaire;
