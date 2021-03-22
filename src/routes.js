import { response, Router} from 'express';

import UserController from './app/controllers/UserController';

import LoginController from'./app/controllers/LoginController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);
routes.post('/login', LoginController.store)


routes.get('/contatos', (require, response) => {
    response.send("Alex, Alan, Vitor e Vinicius");
})

//module.exports = routes;
export default routes;