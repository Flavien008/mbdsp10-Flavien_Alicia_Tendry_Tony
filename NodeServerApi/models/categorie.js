const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define('Categorie', {
    categorie_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'Categories'
});

Categorie.associate = (models) => {
    Categorie.hasMany(models.Objet, { as: 'objets', foreignKey: 'categorie_id' });
};

module.exports = Categorie;
