const router = require('express').Router();
const service = require('./service');
const config = require('config');
const auth = require('../auth/auth');

const {highestSalaries, newUsers, topEmployees}  = config.get('routes.reports');

router.get(highestSalaries, auth, service.getHigestSalaries);
router.get(newUsers, auth, service.getNewUsers);
router.get(topEmployees, auth, service.getUsersWithBadges);

module.exports = router;