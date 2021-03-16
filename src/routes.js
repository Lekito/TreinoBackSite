//const { Router} = require('express');
import { Router} from 'express';

import mongoose from 'mongoose';

const routes = new Router();

// Conexão com o banco de dados
/*
mongoose.connect('mongodb://localhost/alex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com o MongoDB não foi realizada com sucesso! " + erro);
});
*/

routes.get('/', (require, response) => {
    response.send("Alex");
})

routes.get('/contatos', (require, response) => {
    response.send("Alex, Alan, Vitor e Vinicius");
})

//module.exports = routes;
export default routes;