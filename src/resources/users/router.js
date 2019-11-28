const router = require('express').Router();

const upload = require('../../../config/multer.conf');
const auth = require('../auth/auth');
const service = require('./service');
const validateSchema = require('../../common/validation/validation');
const config = require('config');

const signUpRoute = config.get('routes.users.signUp');
const loginRoute = config.get('routes.users.login');
const profileRoute = config.get('routes.users.profile');
const logoutRoute = config.get('routes.users.logout');

router.post(signUpRoute, validateSchema('sign-up'), service.authAction);

router.post(loginRoute, validateSchema('login'), service.authAction);

router.get(profileRoute, auth, service.getUserProfile);

router.put('/edit', auth, upload.single('userpic'), service.changeUserpic);

router.get(logoutRoute, service.logout);

module.exports = router;