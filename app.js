const express = require('express');
const path = require('path');
const session = require('express-session');
const lowdb = require('lowdb');
const bodyParser = require('body-parser')


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