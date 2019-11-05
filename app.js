const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const config = require('config');

const newUsersRouter = require('./routes/newUsers');
const newUsersRoute = config.get('routes.newUsers');
const highestSalariesRouter = require('./routes/higestSalaries');
const highestSalariesRoute = config.get('routes.highestSalaries');
const topEmployeesRouter = require('./routes/topEmployees');
const topEmployeesRoute = config.get('routes.topEmployees');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res, next) => {
    res.send('now then');
    next();
})

app.use(newUsersRoute, newUsersRouter);
app.use(highestSalariesRoute, highestSalariesRouter);
app.use(topEmployeesRoute, topEmployeesRouter);