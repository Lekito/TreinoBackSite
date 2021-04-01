import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import configAuth from '../../config/auth';

class LoginController{
    async store(require, response){
        const { email, password} = require.body;

        const userExiste = await User.findOne({email: email});

        if(!userExiste){
            return response.json({
                error: true, 
                code: 110,
                message: "Error: Usuário não encontrado!"
            })
        }

        if(! (await bcrypt.compare(password, userExiste.password))){
            return response.json({
                error: true, 
                code: 111,
                message: "Error: Senha inválida!"
            })
        }

        return response.status(200).json({
            user: {
                id: userExiste._id,
                name: userExiste.name, 
                email
            },
            token: jwt.sign({id: userExiste._id}, configAuth.secret, {expiresIn: configAuth.expiresIn}),
        })
    }
}

export default new LoginController();