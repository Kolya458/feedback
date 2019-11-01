const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();

const newUsersRouter = require('./routes/newUsers');
const highestSalaries = require('./routes/higestSalaries');
const topEmployees = require('./routes/topEmployees');


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

app.use('/new-users', newUsersRouter);
app.use('/highest-salaries', highestSalaries);
app.use('/top-employees', topEmployees);