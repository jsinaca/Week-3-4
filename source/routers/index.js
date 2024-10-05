const routes = require('express').Router();
const controller = require('../controllers');

routes.use('/', require('./swagger'))
routes.get('/', controller.home);
routes.use('/cars', require('./cars'));
routes.use('/users', require('./users'));

module.exports = routes;