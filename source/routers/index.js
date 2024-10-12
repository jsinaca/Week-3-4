const routes = require('express').Router();
const passport = require('passport');
const controller = require('../controllers');

routes.use('/', require('./swagger'))
routes.get('/', controller.home);
routes.get('/github/callback', passport.authenticate('github', {failureRedirect: '/api-docs', session: false}),
	(req, res) => {	
		req.session.user = req.user;
		res.redirect('/')});
routes.use('/cars', require('./cars'));
routes.use('/users', require('./users'));

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', controller.logout);
//     function(req, res, next) {
//     req.logout(function(err) {
//         if (err) { return next(err);}
//         res.redirect('/')
//     })
// })

module.exports = routes;