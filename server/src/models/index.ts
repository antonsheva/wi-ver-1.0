const dbConfig = require('../config/dbPg')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {
Sequelize : Sequelize,
sequelize : sequelize,
user      : require('./User')(sequelize),
product   : require('./Product')(sequelize),
token     : require('./Token')(sequelize),
};
module.exports = db;