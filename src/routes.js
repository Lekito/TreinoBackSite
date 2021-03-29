import { response, Router} from 'express';

import UserController from './app/controllers/UserController';
import PerfilController from './app/controllers/PerfilController';

import LoginController from'./app/controllers/LoginController';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users',authMiddlewares, UserController.update);
routes.delete('/users/:id', authMiddlewares, UserController.delete);

routes.get('/perfil', authMiddlewares, PerfilController.show);
routes.put('/perfil', authMiddlewares, PerfilController.update);


routes.post('/login', LoginController.store)

//module.exports = routes;
export default routes;