const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
            model: 'Utilisateurs', // Sequelize uses the table name in references
            key: 'user_id'
        }
    },
    categorie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories', // Sequelize uses the table name in references
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
    timestamps: false,
    tableName: 'Objets' // explicitly define table name to avoid confusion
});

// Définir les associations
Objet.associate = (models) => {
    Objet.belongsTo(models.Utilisateur, { as: 'utilisateur', foreignKey: 'user_id' });
    Objet.belongsTo(models.Categorie, { as: 'categorie', foreignKey: 'categorie_id' });
    Objet.hasMany(models.Postedetails, { as: 'postedetails', foreignKey: 'item_id' });
};

module.exports = Objet;
