import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class UserController{

    async index(require, response){
        const {page = 1} = require.query;
        console.log( " Pagina " + page);
        const { limit = 40} = require.query;

        await User.paginate({},{
            select: '_id name email',
            page: page, 
            limit: limit
        }).then((users) => {
            return response.json({
                error: false,
                users: users
            })
        }).catch((erro) => {
            return response.status(400).json({
                erro: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(require, response){
        User.findOne({_id: require.params.id}, '_id name email createdAt updatedAt originalName fileName').then((user) => {
            return response.json({
                error: false,
                code: 200,
                message: "Acesso permitido!",
                user: user
            });
        }).catch((erro) => {
            return response.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Usuário não encontrado!"
            })
        });
        
        
    }

    async store(require, response){

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required().min(6)
        });

        if(!(await schema.isValid(require.body))){
            return response.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        const emailExiste = await User.findOne({email: require.body.email})
        if(emailExiste){
            return response.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este e-mail já está cadastrado! Tente outro e-mail!"
            });
        };

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

    async update(require, response){
        const schema = yup.object().shape({
            _id: yup.string().required(),
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

        const { _id, email } = require.body;

        const userExists = await User.findOne({_id : _id});

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

        await User.updateOne({_id: dados._id}, dados, (err) => {
            if(err) return response.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Usuário não foi editado com sucesso!"
            });

            return response.status(200).json({
                error: false,
                message: "Usuário editado com sucesso!"
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
            });
        };

        const user = await User.deleteOne({_id: require.params.id}, (err) => {
            if(err) return response.status(400).json({
                error: true,
                code: 122,
                message: "Error: Usuário não foi apagado com sucesso!"
            });
        });
        return response.json({
            error: false,
            message: "Usuário apagado com sucesso!"
        });
    };
};

export default new UserController();