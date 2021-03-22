import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController{
    async store(require, response){

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required().min(6)
        })

        if(!(await schema.isValid(require.body))){
            return response.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        }

        const emailExiste = await User.findOne({email: require.body.email})
        if(emailExiste){
            return response.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este e-mail já está cadastrado! Tente outro e-mail!"
            });
        }

        var dados = require.body;
        dados.password = await bcrypt.hash(dados.password, 8);

        const user = await User.create(dados, (error) => {
            if(error) return response.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado com sucesso!"
            });

            return response.status(200).json({
                error: false,
                message: "Usuario cadastrado com sucesso!",
                dados: user
            });
        });
    };

    async delete(require, response){

        const userExists = await User.findOne({_id: require.params.id});

        if(!userExists){
            return response.status(400).json({
                error: true,
                code: 121,
                message: "Erro: Usuário não encontrado!"
            })
        }

        const user = await User.deleteOne({_id: require.params.id}, (err) => {
            if(err) return response.status(400).json({
                error: true,
                code: 122,
                message: "Error: Usuário não foi apagado com sucesso!"
            })
        });
        return response.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        })
    }
}

export default new UserController();