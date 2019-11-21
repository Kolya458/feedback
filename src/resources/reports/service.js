const downloadFile = require('../../common/downloadFile');
const reportMapper = require('../../mapper/reportMapper');
const getBadgesArray = require('../../common/utils').getBadgesArray;

const fileFromGoogleDrive = downloadFile();


const getAppropriateData = (req ,res, callback) => {
    fileFromGoogleDrive.then(async(csvReport) => {
        const csvRow = await reportMapper(csvReport);
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
    const firstUserSalary = new Number(firstUser["salary"]);
    const secondUserSalary = new Number(secondUser["salary"]);
    return secondUserSalary - firstUserSalary;
};

const getSalaries = reportsArray => {
    reportsArray.sort(sortBySalary);
    const highSalariesArray = reportsArray.map(user => {
        return {
            name: user.firstName,
            lastName: user.lastName,
            salary: user.salary,
            salaryUsd: user.salaryUsd

        }
    });
    return highSalariesArray;
};

const sortByDate = ( firstUser, secondUser) => {
    const firstUserDate = Date.parse(firstUser["joinDate"]);
    const secondUserDate = Date.parse(secondUser["joinDate"]);
    return secondUserDate - firstUserDate; 
};
  
const newUsers = reportsArray => {
    reportsArray.sort(sortByDate);
    const newUsersArray = reportsArray.map(user => {
        return {
            name: user.firstName,
            lastName: user.lastName,
            join_date: user.joinDate
        }
    });
    return newUsersArray;
};

const usersWithBadges = reportsArray => {
    const usersWithBadges = reportsArray
        .filter(x => x['badges'] !== '')
        .map(user => {
            return {
                name: user.firstName,
                lastName: user.lastName,
                badges: getBadgesArray(user)
            }
    });
    return usersWithBadges;
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