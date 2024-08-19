const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('TPT', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
