const driveApi = require('../config/driveApi');
const client_secret = process.env.client_secret;
const redirect_uris = process.env.redirect_uris;
const client_id = process.env.client_id;
const fileId = process.env.file_id


module.exports = async(resolve,reject) => {
  const auth = await driveApi.authorize(client_secret, client_id, redirect_uris);
  const csvRow = await driveApi.getFile(auth, fileId);
  return csvRow;
}






