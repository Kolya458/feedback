const router = require('express').Router();
const auth = require('../auth/auth');
const service = require('./service');
const config = require('config');
const signUpRoute = config.get('routes.users.signUp');
const loginRoute = config.get('routes.users.login');
const profileRoute = config.get('routes.users.profile');

router.post(signUpRoute, auth.optional, service.authAction);

router.post(loginRoute, auth.optional, service.authAction);

router.get(profileRoute, auth.required, service.getUserProfile);

module.exports = router;