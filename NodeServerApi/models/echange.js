const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Utilisateur = require('./utilisateur');
const Poste = require('./poste');

const Echange = sequelize.define('Echange', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Poste,
            key: 'poste_id'
        }
    },
    proposer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Utilisateur,
            key: 'user_id'
        }
    },
    responder_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Utilisateur,
            key: 'user_id'
        }
    }
}, {
    timestamps: false
});

Echange.associate = (models) => {
    Echange.belongsTo(models.Utilisateur, { as: 'Proposer', foreignKey: 'proposer_id' });
    Echange.belongsTo(models.Utilisateur, { as: 'Responder', foreignKey: 'responder_id' });
    Echange.belongsTo(models.Poste, { foreignKey: 'post_id' });
    Echange.hasMany(models.EchangeDetail, { foreignKey: 'echange_id' });
};

module.exports = Echange;
