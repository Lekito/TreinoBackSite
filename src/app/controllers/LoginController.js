import bcrypt from 'bcryptjs';
import User from '../models/User'

class LoginController{
    async store(require, response){
        const { email, password} = require.body;

        const userExiste = await User.findOne({email: email});

        if(!userExiste){
            return response.status(401).json({
                error: true, 
                code: 110,
                message: "Error: Usuário não encontrado!"
            })
        }

        if(! (await bcrypt.compare(password, userExiste.password))){
            return response.status(401).json({
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
            }
        })
    }
}

export default new LoginController();