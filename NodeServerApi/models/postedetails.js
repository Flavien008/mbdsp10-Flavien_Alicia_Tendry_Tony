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
        allowNull: false,
        references: {
            model: 'Postes', // Sequelize uses the table name in references
            key: 'poste_id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Objets', // Sequelize uses the table name in references
            key: 'item_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'Postedetails' // explicitly define table name to avoid confusion
});

Postedetails.associate = (models) => {
    Postedetails.belongsTo(models.Poste, { as: 'poste', foreignKey: 'post_id' });
    Postedetails.belongsTo(models.Objet, { as: 'objet', foreignKey: 'item_id' });
};

module.exports = Postedetails;
