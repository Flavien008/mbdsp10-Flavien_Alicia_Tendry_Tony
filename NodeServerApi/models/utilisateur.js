const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateur = sequelize.define('Utilisateur', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    dateNaissance: {
        type: DataTypes.DATE,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles',
            key: 'role_id'
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
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
    timestamps: false,
    tableName: 'Utilisateurs'
});

Utilisateur.associate = (models) => {
    Utilisateur.belongsTo(models.Role, { foreignKey: 'role_id' });
    Utilisateur.hasMany(models.Poste, { foreignKey: 'user_id', as: 'postes' });
    Utilisateur.hasMany(models.Objet, { as: 'objets', foreignKey: 'user_id' });
};

module.exports = Utilisateur;
