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

        await User.updateOne({_id: require.userId}, dadosImagem, (err) => {
            if(err) return response.status(400).json({
                error: true,
                code: 129,
                message: "Erro: Imagem do perfil não editada com sucesso!"
            })
        })

        console.log(dadosImagem);
        return response.json({
            error: false,
            message: "Imagem do perfil editado com sucesso!"
        });
    }
};

export default new PerfilImagemController();