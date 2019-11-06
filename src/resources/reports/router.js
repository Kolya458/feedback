const express = require('express');
const router = express.Router();
const service = require('./service');
const config = require('config');

const highestSalariesRoute = config.get('routes.reports.highestSalaries');
const newUsersRoute = config.get('routes.reports.newUsers');
const topEmployeesRoute = config.get('routes.reports.topEmployees');

router.get(highestSalariesRoute, service.getHigestSalaries);
router.get(newUsersRoute, service.getNewUsers);
router.get(topEmployeesRoute, service.getUsersWithBadges);
module.exports = router;