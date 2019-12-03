const downloadFile = require('../../common/downloadFile');
const reportMapper = require('../../mapper/reportMapper');

const getSortedSalaries = require('../../common/utils').getSortedSalaries;
const newUsers = require('../../common/utils').newUsers;
const usersWithBadges = require('../../common/utils').usersWithBadges;

const fileFromGoogleDrive = downloadFile();

const getAppropriateData = (req ,res, next, callback) => {
    fileFromGoogleDrive.then(async(csvReport) => {
        const csvRow = await reportMapper(csvReport);
        const data = callback(csvRow);
        res.status(200).json({
            users: data
        })
    })
    .catch(next);
};

const getHigestSalaries = (req, res, next) => {
    getAppropriateData(req, res, next, getSortedSalaries);
};

const getNewUsers = (req, res, next) => {
    getAppropriateData(req, res, next, newUsers);
};

const getUsersWithBadges = (req, res, next) => {
    getAppropriateData(req, res, next, usersWithBadges);
};

module.exports = {
    getHigestSalaries,
    getNewUsers,
    getUsersWithBadges
}