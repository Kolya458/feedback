const downloadFile = require('../../../files/downloadFile');
const fileFromGoogleDrive = downloadFile()

const getAppropriateData = (req ,res, callback) => {
    fileFromGoogleDrive.then((csvRow) => {
        const data = callback(csvRow);
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
};

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

const sortByDate = ( firstUser, secondUser) => {
    const firstUserDate = Date.parse(firstUser[3]);
    const secondUserDate = Date.parse(secondUser[3]);
    return secondUserDate - firstUserDate; 
};
  
const newUsers = csvRow => {
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

const usersWithBadges = (csvRow) => {
    const users =  csvRow.slice(1);
    const headers = csvRow.slice(0, 1);
    const usersWithBadges = users.filter(x => x[6] !== '')
    const result = []
    for (i=0; i<usersWithBadges.length; i++) {
        const userWithBadge = usersWithBadges[i];
        const flatBadgesArray = userWithBadge[6].split('|');
        const entries = []
        for (let i=0; i<flatBadgesArray.length; i+=2) {
            entries.push([flatBadgesArray[i], flatBadgesArray[i+1]]);
        }
        const badgesArray = []
        for(let el of entries){
            badgesArray.push({name: el[0], data: el[1]})
        }
        result.push({
            [headers[0][0]]: userWithBadge[0],
            [headers[0][1]]: userWithBadge[1],
            [headers[0][6]]: badgesArray
        })
    }
    return result;
};

const getHigestSalaries = (req, res) => {
    getAppropriateData(req, res, getSalaries);
};

const getNewUsers = (req, res) => {
    getAppropriateData(req, res, newUsers);
};

const getUsersWithBadges = (req, res) => {
    getAppropriateData(req, res, usersWithBadges);
};

module.exports = {
    getHigestSalaries,
    getNewUsers,
    getUsersWithBadges
}