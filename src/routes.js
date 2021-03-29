import { response, Router} from 'express';
import multer from 'multer';
import multerUpImgUsers from './app/middlewares/uploadImgUser';

import UserController from './app/controllers/UserController';
import PerfilController from './app/controllers/PerfilController';
import PerfilImagemController from './app/controllers/PerfilImagemController';

import LoginController from'./app/controllers/LoginController';
import authMiddlewares from './app/middlewares/auth';
import multerUpImgUsers from './app/middlewares/uploadImgUser';


const routes = new Router();
const uploadImgUser = multer(multerUpImgUsers);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users',authMiddlewares, UserController.update);
routes.delete('/users/:id', authMiddlewares, UserController.delete);

routes.get('/perfil', authMiddlewares, PerfilController.show);
routes.put('/perfil', authMiddlewares, PerfilController.update);
routes.put('/perfil-img', authMiddlewares, uploadImgUser.single('file'), PerfilImagemController.update);


routes.post('/login', LoginController.store)

//module.exports = routes;
export default routes;