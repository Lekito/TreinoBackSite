const { Router} = require('express');

const routes = new Router();

routes.get('/', (require, response) => {
    response.send("Alex");
})

module.exports = routes;