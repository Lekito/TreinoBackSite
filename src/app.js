//const express = require('express'); modo antigo do JavaScript
//const routes = require('./routes');
import express from 'express'; // modo novo do JavaScript
import routes from './routes';

class App{
    constructor(){
        this.app = express();
        this.routes();
    }
    routes(){
        this.app.use(routes)
    }
}

//module.exports = new App().app;  modo antigo do JavaScript
export default new App().app;