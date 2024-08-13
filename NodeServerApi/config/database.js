const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('TPT', 'postgres', 'tptmbds2024!', {
    host: '34.44.27.115',
    dialect: 'postgres',
});

module.exports = sequelize;
