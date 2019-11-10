const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
const config = require('config');

const DB_URL = config.get('db.db_url')

const reportsRootRoute = config.get('routes.reports.root');
const reportsRouter = require('./resources/reports/router');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(DB_URL, {useNewUrlParser: true}, (err) => {
    if(err) {
        console.log(`error to connect to database: ${err}`);
    } else {
        console.log(`connect to db`);
    }
})

require('./models/Users');
require('../config/passport');

app.get('/', (req, res, next) => {
    res.send('now then');
    next();
})

app.use(reportsRootRoute, reportsRouter);

module.exports = app;