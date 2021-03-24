import * as Yup from 'yup';
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
;}

export default new PerfilController();