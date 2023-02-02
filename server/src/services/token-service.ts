const jwt = require('jsonwebtoken')


const dbM = require('../models');
const TokenModel = dbM.token;

class TokenService {

    generateTokens(payload:{}){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId:number, refreshToken:string){
        const tokenModel = TokenModel.findOne({where:{user_id:userId}})
        if (tokenModel){
            TokenModel.update({refresh_token:refreshToken}, {where: {user_id: userId}})
        }
        return  await TokenModel.create({refresh_token: refreshToken, user_id: userId})
    }
    async removeToken(refreshToken:string){
        return await TokenModel.destroy({where: {refresh_token: refreshToken}});
    }
    async findToken(refreshToken:string){
        return await TokenModel.findOne({where: {refresh_token: refreshToken}});
    }

    validateAccessToken(token:string){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }catch (e) {
            return null;
        }
    }
    validateRefreshToken(token:string){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }catch (e) {
            return null;
        }
    }
    
}
module.exports = new TokenService()