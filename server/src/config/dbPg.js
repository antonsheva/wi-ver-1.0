"use strict";
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Aser1234",
    DB: "wi",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
