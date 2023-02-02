const userService = require('../services/user-service')
const {validationResult} = require('express-validator')
import ApiError from '../exceptions/api-error'
class UserController {
    async registration(req:any, res:any,next:any){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return next (ApiError.BadRequest('Ошибка валидации', errors.array()));
            }
            const {login, password, email} = req.body;
            const userData = await userService.registration(login, password, email);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*3600*1000, httpOnly:true})
            res.json(userData);
        }catch (e) {
            next(e);
        }
    }
    async login(req:any, res:any,next:any){
        try {
            const {login, password} = req.body;
            const userData =  await userService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*3600*1000, httpOnly:true})
            res.status(200).json(userData);
        }catch (e) {
            next(e);
        }
    }
    async logout(req:any, res:any,next:any){
        try {
            const {refreshToken} = req.cookies;
            const token = userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return  res.status(200).json({topken: token});
        }catch (e) {
            next(e);
        }
    }
    async activate(req:any, res:any,next:any){
        console.log('activate')
        try {
            const activationLink = req.params.link;
            const result = await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }catch (e) {
            next(e);
        }
    }
    async refresh(req:any, res:any,next:any){
        try {
            const {refreshToken} = req.cookies;
            const userData =  await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*3600*1000, httpOnly:true})
            res.status(200).json(userData);
        }catch (e) {
            next(e);
        }
    }
    async getUsers(req:any, res:any,next:any){
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users)
        }catch (e) {
            next(e);
        }
    }

}
module.exports = new UserController()

