const downloadFile = require('../../common/downloadFile');
const reportMapper = require('../../mapper/reportMapper');

const getSortedSalaries = require('../../common/utils').getSortedSalaries;
const newUsers = require('../../common/utils').newUsers;
const usersWithBadges = require('../../common/utils').usersWithBadges;

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

const getHigestSalaries = (req, res) => {
    getAppropriateData(req, res, getSortedSalaries);
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