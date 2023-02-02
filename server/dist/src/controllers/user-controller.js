"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService = require('../services/user-service');
const { validationResult } = require('express-validator');
const api_error_1 = __importDefault(require("../exceptions/api-error"));
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next(api_error_1.default.BadRequest('Ошибка валидации', errors.array()));
                }
                const { login, password, email } = req.body;
                const userData = yield userService.registration(login, password, email);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
                res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                const userData = yield userService.login(login, password);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
                res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = userService.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.status(200).json({ topken: token });
            }
            catch (e) {
                next(e);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('activate');
            try {
                const activationLink = req.params.link;
                const result = yield userService.activate(activationLink);
                return res.redirect(process.env.CLIENT_URL);
            }
            catch (e) {
                next(e);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield userService.refresh(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
                res.status(200).json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAllUsers();
                res.status(200).json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
module.exports = new UserController();
//# sourceMappingURL=user-controller.js.map