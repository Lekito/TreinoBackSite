import User from '../models/User';

class UserController{
    async store(require, response){
        const emailExiste = await User.findOne({email: require.body.email})
        if(emailExiste){
            return response.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este e-mail já está cadastrado! Tente outro e-mail!"
            });
        }

        if(!require.body.name || require.body.name == undefined || require.body.name == null){
            return response.status(400).json({
                error: true,
                code: 103,
                message: "Error: Necessário informar o nome!"
            });
        }

        if(!require.body.email || require.body.email == undefined || require.body.email == null){
            return response.status(400).json({
                error: true,
                code: 104,
                message: "Error: Necessário informar o e-mail!"
            });
        }

        if(!require.body.password || require.body.password == undefined || require.body.password == null){
            return response.status(400).json({
                error: true,
                code: 105,
                message: "Error: Necessário informar senha!"
            });
        }

        const user = await User.create(require.body, (error) => {
            if(error) return response.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado com sucesso!"
            });

            return response.status(200).json({
                error: false,
                message: "Usuario cadastrado com sucesso!",
                dados: user
            })
        });
    }
}

export default new UserController();