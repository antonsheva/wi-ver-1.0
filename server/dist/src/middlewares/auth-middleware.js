"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../exceptions/api-error"));
const tokenService = require('../services/token-service');
module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(api_error_1.default.UnauthorisedError());
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return next(api_error_1.default.UnauthorisedError());
        }
        const userData = tokenService.validateAccessToken(token);
        if (!userData) {
            return next(api_error_1.default.UnauthorisedError());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(api_error_1.default.UnauthorisedError());
    }
};
//# sourceMappingURL=auth-middleware.js.map