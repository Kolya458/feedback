const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../db.json');
const db = low(adapter);
const client_secret = db.get("access.client_secret").value();
const redirect_uris = db.get("access.redirect_uris").value();
const client_id = db.get("access.client_id").value();
const token = db.get("token").value();
const file_id = db.get("file_id").value();


module.exports = {
    db,
    client_secret,
    redirect_uris,
    client_id,
    token,
    file_id
};