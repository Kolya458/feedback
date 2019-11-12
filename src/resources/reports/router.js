const express = require('express');
const router = express.Router();
const service = require('./service');
const config = require('config');
const auth = require('../auth/auth');

const highestSalariesRoute = config.get('routes.reports.highestSalaries');
const newUsersRoute = config.get('routes.reports.newUsers');
const topEmployeesRoute = config.get('routes.reports.topEmployees');

router.get(highestSalariesRoute, auth.required, service.getHigestSalaries);
router.get(newUsersRoute, auth.required, service.getNewUsers);
router.get(topEmployeesRoute, auth.required, service.getUsersWithBadges);
module.exports = router;