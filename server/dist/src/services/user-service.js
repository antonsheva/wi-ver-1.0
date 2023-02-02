var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dbModels = require('../models');
const def = require('../../define');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const UserModel = dbModels.user;
class UserService {
    registration(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield UserModel.findOne({ where: { login: login } });
            if (candidate !== null) {
                throw ApiError.BadRequest(`Логин ${login} занят`);
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const activatedLink = uuid.v4();
            const user = yield UserModel.create({ login: login, password: hashPassword, activated_link: activatedLink });
            yield mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activatedLink}`);
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign({}, tokens, { user: userDto });
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield UserModel.findOne({ where: { activated_link: activationLink } });
            if (userModel === null) {
                console.log('Пользователь не найден');
                throw ApiError.BadRequest(`Пользователь не найден`);
            }
            const user = userModel.dataValues;
            console.log('activate -> start');
            console.log(user);
            console.log('userId -> ' + user.id);
            yield UserModel.update({ is_activated: true }, {
                where: { id: user.id },
                returning: true,
                plain: true
            })
                .then((result) => {
                console.log('activate -> ok');
                return true;
            })
                .catch((err) => {
                console.log('activate -> error');
                throw ApiError.BadRequest(`Ошибка активации`);
            });
            console.log('activate -> end');
        });
    }
    login(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userModel = yield UserModel.findOne({ where: { login: login } });
            if (userModel === null) {
                throw ApiError.BadRequest('Неверный логин или пароль');
            }
            const user = userModel.dataValues;
            const isEqualsPass = yield bcrypt.compare(password, user.password);
            if (!isEqualsPass) {
                throw ApiError.BadRequest('Неверный логин или пароль!');
            }
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign({}, tokens, { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield tokenService.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError.UnauthorisedError();
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorisedError();
            }
            const user = yield UserModel.findOne({ where: { id: userData.id } });
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign({}, tokens, { user: userDto });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.findAll();
        });
    }
}
module.exports = new UserService();
//# sourceMappingURL=user-service.js.map