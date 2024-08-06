const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Poste = sequelize.define('Poste', {
    poste_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Utilisateurs',
            key: 'user_id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    titre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    latitude: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    tableName: 'Postes'
});

Poste.associate = (models) => {
    Poste.belongsTo(models.Utilisateur, { as: 'utilisateur', foreignKey: 'user_id' });
    Poste.hasMany(models.Postedetails, { foreignKey: 'post_id', as: 'details' });
};

module.exports = Poste;
