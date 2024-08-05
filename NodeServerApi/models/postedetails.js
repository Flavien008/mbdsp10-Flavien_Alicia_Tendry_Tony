const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Poste = require('./poste');
const Objet = require('./objet');

const Postedetails = sequelize.define('Postedetails', {
    poste_details_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Poste,
            key: 'poste_id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Objet,
            key: 'item_id'
        }
    }
}, {
    timestamps: false
});

// Définir les associations
Postedetails.belongsTo(Poste, { as: 'Poste', foreignKey: 'post_id' });
Postedetails.belongsTo(Objet, { as: 'Objet', foreignKey: 'item_id' });

module.exports = Postedetails;


