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
    timestamps: false
});


module.exports = Poste;
