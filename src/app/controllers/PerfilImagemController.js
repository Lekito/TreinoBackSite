import User from '../models/User';
import fs from 'fs';

class PerfilImagemController{
    async update(require, response){
        console.log(require.file);

        const dadosImagem = {
            originalName: require.file.originalname,
            fileName: require.file.filename
        }

        await User.findOne({_id: require.userId}, '_id fileName').then((user) => {
            console.log(user);
        }).catch((err) => {
            return response.status(400).json({
                error: true,
                code: 128,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })

        console.log(dadosImagem);
        return response.json({
            error: false,
            message: "Upload img user"
        });
    }
};

export default new PerfilImagemController();