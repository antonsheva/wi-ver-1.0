const dbModels = require('../models')
const def = require('../../define')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
import ApiError from '../exceptions/api-error'

const UserModel = dbModels.user;

class UserService {
    async registration(login:string, password:string, email:string){
        const candidate = await UserModel.findOne({where: {login: login}});
        if (candidate !== null){
            throw ApiError.BadRequest(`Логин ${login} занят`);
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const activatedLink = uuid.v4();

        const user = await UserModel.create({login: login, password: hashPassword, activated_link: activatedLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activatedLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user:userDto
        }
    }


    async activate(activationLink:string){
        const userModel = await UserModel.findOne({where:{activated_link: activationLink}});
        if (userModel === null){
            console.log('Пользователь не найден')
            throw ApiError.BadRequest(`Пользователь не найден`);
        }
        const user = userModel.dataValues;
        console.log('activate -> start')
        console.log(user)
        console.log('userId -> '+user.id)
        await UserModel.update(
            {is_activated: true},
            {
                where:{id:user.id},
                returning: true,
                plain: true
            })
            .then( (result:any) => {
                console.log('activate -> ok')
                return true;
            })
            .catch((err:any) => {
                console.log('activate -> error')
                throw ApiError.BadRequest(`Ошибка активации`);
            });
        console.log('activate -> end')
    }

    async login(login:string, password:string){
        const userModel = await UserModel.findOne({where: {login: login}});
        if (userModel === null){
            throw ApiError.BadRequest('Неверный логин или пароль');
        }
        const user = userModel.dataValues
        const isEqualsPass = await bcrypt.compare(password, user.password);
        if (!isEqualsPass){
            throw ApiError.BadRequest('Неверный логин или пароль!');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
    async logout(refreshToken:string){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken:string){
        if(!refreshToken){
            throw ApiError.UnauthorisedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorisedError();
        }
        const user = await UserModel.findOne({where: {id: userData.id}})

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getAllUsers(){
        return await UserModel.findAll()
    }
}

module.exports = new UserService()
