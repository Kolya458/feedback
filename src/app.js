const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const config = require('config');

const reportsRootRoute = config.get('routes.reports.root');
const reportsRouter = require('./resources/reports/router');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('now then');
    next();
})

app.use(reportsRootRoute, reportsRouter);

module.exports = app;