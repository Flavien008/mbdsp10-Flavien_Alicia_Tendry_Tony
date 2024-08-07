const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Echange = require('./echange');
const Objet = require('./objet');

const EchangeDetail = sequelize.define('EchangeDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    echange_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Echange,
            key: 'id'
        }
    },
    objet_id: {
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

EchangeDetail.associate = (models) => {
    EchangeDetail.belongsTo(models.Echange, { foreignKey: 'echange_id' });
    EchangeDetail.belongsTo(models.Objet, { foreignKey: 'objet_id' });
};

module.exports = EchangeDetail;
