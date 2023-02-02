"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
module.exports = (seqelize) => {
    const User = seqelize.define('user', {
        id: {
            type: sequelize_1.default.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        login: { type: sequelize_1.default.STRING, allowNull: true },
        password: { type: sequelize_1.default.STRING, allowNull: true },
        email: { type: sequelize_1.default.STRING, allowNull: true },
        is_activated: { type: sequelize_1.default.BOOLEAN, defaultValue: false, allowNull: true },
        role: { type: sequelize_1.default.STRING, defaultValue: "USER", allowNull: true },
        activated_link: { type: sequelize_1.default.STRING, allowNull: true },
        vote_qt: { type: sequelize_1.default.INTEGER, allowNull: true },
        name: { type: sequelize_1.default.STRING, allowNull: true },
        img: { type: sequelize_1.default.STRING, allowNull: true },
        rating: { type: sequelize_1.default.INTEGER, allowNull: true },
    });
    return User;
};
//# sourceMappingURL=User.js.map