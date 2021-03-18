import { response, Router} from 'express';
import User from './app/models/User';

import mongoose from 'mongoose';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

/*routes.get('/', async(require, response) => {
    await User.create( {
        nome: 'Alan',
        email: 'alan_eng@gmail.com',
        senha: '123456a'
    }, function(erro, small){
        if(erro) return response.status(400).json({error: "Erro: Usuário não foi cadastrado com sucesso!"});
        
        return response.status(200).json({error: "Usuário cadastrado com sucesso!"}); 
    });
});
*/


routes.get('/contatos', (require, response) => {
    response.send("Alex, Alan, Vitor e Vinicius");
})

//module.exports = routes;
export default routes;