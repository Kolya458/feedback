const driveApi = require('../config/driveApi');
const client_secret = require("../config/db.js").client_secret;
const redirect_uris = require("../config/db.js").redirect_uris;
const client_id = require("../config/db.js").client_id;
const fileId = require('../config/db.js').file_id;


module.exports = async(resolve,reject) => {
  const auth = await driveApi.authorize(client_secret, client_id, redirect_uris);
  const csvRow = await driveApi.getFile(auth, fileId);
  return csvRow;
}

// const client_secret = process.env.client_secret;
// const redirect_uris = process.env.redirect_uris;
// const client_id = process.env.client_id;
// const fileId = process.env.file_Id



