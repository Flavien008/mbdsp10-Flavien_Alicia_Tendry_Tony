const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Postedetails = sequelize.define('Postedetails', {
    poste_details_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});



module.exports = Postedetails;
