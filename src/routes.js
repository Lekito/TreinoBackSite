import { response, Router} from 'express';

import UserController from './app/controllers/UserController';

import LoginController from'./app/controllers/LoginController';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.delete('/users/:id', authMiddlewares, UserController.delete);
routes.post('/login', LoginController.store)
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);


routes.get('/contatos', (require, response) => {
    response.send("Alex, Alan, Vitor e Vinicius");
})

//module.exports = routes;
export default routes;