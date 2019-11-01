const downloadFile = require('../files/downloadFile');
const express = require('express');
const router = express.Router();

const getUsersWithBadges = (csvRow) => {
    const users =  csvRow.slice(1);
    const headers = csvRow.slice(0, 1);
    const usersWithBadges = users.filter(x => x[6] !== '')
    const badges = usersWithBadges.map(x => x[6]);
    const result = []
    for (i=0; i<usersWithBadges.length; i++) {
        const userWithBadge = usersWithBadges[i];
        const badgesArray = userWithBadge[6].split('|');
        result.push({
            [headers[0][0]]: userWithBadge[0],
            [headers[0][1]]: userWithBadge[1],
            [headers[0][6]]: badgesArray
        })
    }
    return result;

};

const fileFromGoogleDrive = downloadFile();

router.get('/', (req,res) => {
    fileFromGoogleDrive.then((csvRow) => {
        const data = getUsersWithBadges(csvRow);
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
});

module.exports = router