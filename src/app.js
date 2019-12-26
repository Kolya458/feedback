const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('../config/winston.conf');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
require('dotenv').config();
const config = require('config');
const DB_URL = config.get('db.db_url');
const reportsRootRoute = config.get('routes.reports.root');
const reportsRouter = require('./resources/reports/router');

const app = express();
app.disable('x-powered-by')
app.use(express.json());

mongoose.connect(DB_URL, {useNewUrlParser: true}, (err) => {
    if(err) {
        console.error(`error to connect to database cause: ${err}`);
    } else {
        console.log(`connect to db`);
    }
})
require('./models/Users');
require('../config/passport');
const usersRouter = require('./resources/users/router');
const usersRootRoute = config.get('routes.users.root');

app.use(morgan('combined', { stream: winston.stream }));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(reportsRootRoute, reportsRouter);
app.use(usersRootRoute, usersRouter);

app.use((err, req, res, next) => {
    const status = err.message.split(':')[0];
    const message = err.message.split(':')[1];
    winston.error(`${status || 500} - ${message || err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(status || 500).send({error: message || err.message});
});

app.get('/', (req, res, next) => {
    res.send('now then');
    next();
});

module.exports = app;