const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('TPT', 'postgres', 'tendry8825', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
