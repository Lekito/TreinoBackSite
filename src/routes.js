//const { Router} = require('express');
import { Router} from 'express';

const routes = new Router();

routes.get('/', (require, response) => {
    response.send("Alex");
})

routes.get('/contatos', (require, response) => {
    response.send("Alex, Alan, Vitor e Vinicius");
})

//module.exports = routes;
export default routes;