import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class PerfilController{
    async show(require, response){
        User.findOne({_id: require.userId}, '_id name email createdAt updatedAt').then((user) => {
            return response.json({
                error: false,
                user: user
            });
        }).catch((erro) => {
            return response.status(400).json({
                error: true,
                code: 115,
                message: "Erro: Perfil não encontrado!"
            });
        });
    };

    async update(require, response){
        const schema = yup.object().shape({
            name: yup.string(),
            email: yup.string().email(),
            password: yup.string().min(6)
        });
        if(!(await schema.isValid(require.body))){
            return response.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { email } = require.body;

        const userExists = await User.findOne({_id : require.userId});

        if(!userExists){
            return response.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Usuário não encontrado!"
            });
        };

        if(email != userExists.email){
            const emailExists = await User.findOne({email: email});
            if(emailExists){
                return response.status(400).json({
                    error: true,
                    code: 110,
                    message: "Erro: Esse e-mail já esta cadastrado!"
                });
            };
        };

        var dados = require.body;
        if(dados.password){
            dados.password = await bcrypt.hash(dados.password, 8);
        };

        await User.updateOne({_id: require.userId}, dados, (err) => {
            if(err) return response.status(400).json({
                error: true,
                code: 116,
                message: "Erro: Usuário não foi editado com sucesso!"
            });

            return response.status(200).json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        });
    };

};

export default new PerfilController();