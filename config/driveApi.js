const {google} = require('googleapis');
// const token = process.env.token;
const converter = require('csvtojson');
const access_token = process.env.access_token;
const refresh_token = process.env.refresh_token;
const expiry_date =process.env.expiry_date;

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
    .then(response => {
        return converter({
            noheader:true,
            output: "csv"
            })
              .fromString(response.data)
              .then((csvRow)=>{ 
            return csvRow;
            })
    })
    .catch(err => {
        console.log('The API returned an error: ' + err)
        return;
    });
};

module.exports = {
    authorize,
    getFile
}


