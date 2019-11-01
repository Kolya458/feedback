const downloadFile = require('../files/downloadFile');
const express = require('express');
const router = express.Router();


const sortByDate = ( firstUser, secondUser) => {
  const firstUserDate = Date.parse(firstUser[3]);
  const secondUserDate = Date.parse(secondUser[3]);
  return secondUserDate - firstUserDate; 
};

const getNewUSers = csvRow => {
    const headers = csvRow.slice(0,1);
    const users =  csvRow.slice(1);
    users.sort(sortByDate);
    const newUsers = [];
    for(let i = 0; i < users.length; i++){
        const user = users[i];
        newUsers.push({
            [headers[0][0]] : user[0],
            [headers[0][1]]: user[1],
            [headers[0][3]]: user[3]
        });
    }
    return newUsers;
};

const fileFromGoogleDrive = downloadFile();

router.get('/', (req, res) => {

    fileFromGoogleDrive.then((csvRow) => {
                const data = getNewUSers(csvRow);
                res.status(200).json({
                    users: data
                })
            })
            .catch( err => {
                console.log(err);
                res.status(500).json({
                    err
                });
            });
});

module.exports = router;