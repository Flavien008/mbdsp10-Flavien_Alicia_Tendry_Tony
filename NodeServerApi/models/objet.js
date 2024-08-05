const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Utilisateur = require('./utilisateur');
const Categorie = require('./categorie');

const Objet = sequelize.define('Objet', {
    item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Utilisateur,
            key: 'user_id'
        }
    },
    categorie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categorie,
            key: 'categorie_id'
        }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = Objet;
