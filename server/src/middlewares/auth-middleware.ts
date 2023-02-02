import ApiError from '../exceptions/api-error'
import {Request, Response} from "express";
const tokenService = require('../services/token-service')

module.exports = (req:any, res:any, next:any) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return next(ApiError.UnauthorisedError());
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return next(ApiError.UnauthorisedError());
        }
        const userData = tokenService.validateAccessToken(token);
        if (!userData){
            return next(ApiError.UnauthorisedError());
        }
        req.user = userData;
        next();
    }catch (e) {

        return next(ApiError.UnauthorisedError());
    }
}

