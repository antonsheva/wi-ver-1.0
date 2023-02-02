"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = require('../config/dbPg');
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // @ts-ignore
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: sequelize,
    user: require('./User')(sequelize),
    product: require('./Product')(sequelize),
    token: require('./Token')(sequelize),
};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.user = require('./User')(sequelize);
// db.product = require('./Product')(sequelize);
// db.token = require('./Token')(sequelize);
exports.default = db;
//# sourceMappingURL=index.js.map