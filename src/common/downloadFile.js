const driveApi = require('../googleApi/driveApi');
const config = require('config');
const client_secret = config.get('googleAutorize.client_secret');
const redirect_uris = config.get('googleAutorize.redirect_uris');
const client_id = config.get('googleAutorize.client_id');
const fileId = config.get('files.file_id');



module.exports = async(resolve,reject) => {
  const auth = await driveApi.authorize(client_secret, client_id, redirect_uris);
  const csvReport = await driveApi.getFile(auth, fileId);
  return csvReport;
}






