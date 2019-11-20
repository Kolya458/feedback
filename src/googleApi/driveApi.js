const {google} = require('googleapis');
const config = require('config');
const converter = require('csvtojson');
const access_token = config.get('googleToken.access_token');
const refresh_token = config.get('googleToken.refresh_token');


const service = google.drive({
      version: 'v3', 
      encoding: null
    });


const authorize = (client_secret, client_id, redirect_uris) => {
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        oAuth2Client.setCredentials({
            access_token,
            refresh_token
        });
        return oAuth2Client;
};

const getFile = (auth, fileId) => {
    return service.files.get({
        auth: auth,
        fileId,
        alt: 'media'
    }, {
        responseType: 'json'
    })
    .then(response => response.data)
    .catch(err => {
        console.log('The API returned an error: ' + err)
        return;
    });
};

module.exports = {
    authorize,
    getFile
}


