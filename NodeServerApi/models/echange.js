const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    },
    proposer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    responder_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    }
}, {
    timestamps: false
});


module.exports = Echange;
