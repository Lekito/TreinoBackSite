//const express = require('express'); modo antigo do JavaScript
//const routes = require('./routes');
import express from 'express'; // modo novo do JavaScript
import routes from './routes';
import './config/conexao';
import path from 'path';

class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(
            '/files',
            express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
        );
    }
    routes(){
        this.app.use(routes)
    }
}

//module.exports = new App().app;  modo antigo do JavaScript
export default new App().app;