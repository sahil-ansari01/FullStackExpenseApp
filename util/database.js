const Sequelize = require('sequelize');
const sequelize =new Sequelize('fullstackExpenseApp', 'root', 'sahil@664', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;