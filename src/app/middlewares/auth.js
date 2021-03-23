import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import configAuth from '../../config/auth';

export default async(require, response, next) => {
    const authHeader = require.headers.authorization;

    if(!authHeader){
        return response.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token não encontrado!"
        });
    }

    const [, token] = authHeader.split(' ');

    try{
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        
        require.userId = decoded.id;

        return next();
    }catch(err){
        return response.status(401).json({
            error: true,
            code: 130,
            message: "Erro: Token inválido!"
        });
    }
}