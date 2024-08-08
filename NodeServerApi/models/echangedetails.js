const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EchangeDetail = sequelize.define('EchangeDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    echange_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    objet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    }
}, {
    timestamps: false
});


module.exports = EchangeDetail;
