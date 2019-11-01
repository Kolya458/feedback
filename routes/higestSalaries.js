const downloadFile = require('../files/downloadFile');
const express = require('express');
const router = express.Router();

const sortBySalary = ( firstUser, secondUser) => {
    const firstUserSalary = new Number(firstUser[4]);
    const secondUserSalary = new Number(secondUser[4]);
    return secondUserSalary - firstUserSalary;
};

const getSalaries = csvRow => {
    const users = csvRow.slice(1);
    const headers = csvRow.slice(0, 1);
    users.sort(sortBySalary);
    const usersHigestSalaries = [];
    for(let i = 0; (i < users.length) && (i <10); i++){
        const user = users[i];
        usersHigestSalaries.push({
            [headers[0][0]]: user[0],
            [headers[0][1]]: user[1],
            [headers[0][4]]: user[4],
            [headers[0][5]]: user[5]
        });
    }
    return usersHigestSalaries;
};

const fileFromGoogleDrive = downloadFile()

router.get('/', (req, res) => {
    fileFromGoogleDrive.then((csvRow) => {
        const data = getSalaries(csvRow);
        res.status(200).json({
            users: data
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err
        });
    })
})

module.exports = router;