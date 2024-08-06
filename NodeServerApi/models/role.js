const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
    role_id: {
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
    tableName: 'Roles' // explicitly define table name to avoid confusion
});

Role.associate = (models) => {
    Role.hasMany(models.Utilisateur, { foreignKey: 'role_id' });
};

module.exports = Role;
