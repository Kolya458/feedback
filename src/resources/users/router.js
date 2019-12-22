const router = require('express').Router();

const upload = require('../../../config/multer.conf');
const auth = require('../auth/auth');
const service = require('./service');
const validateSchema = require('../../common/validation/validation');
const config = require('config');

const {signUp, login, profile, logout, edit, deleteUser}  = config.get('routes.users');

router.post(signUp, validateSchema('sign-up'), service.authAction);
router.post(login, validateSchema('login'), service.authAction);
router.get(profile, auth, service.getUserProfile);
router.put(edit, auth, upload.single('userpic'), service.changeUserpic);
router.delete(deleteUser, auth, service.deleteUser);
router.get(logout, service.logout);

module.exports = router;