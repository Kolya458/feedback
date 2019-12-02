const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwt.secret');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  profession: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  userpicUrl: {
      type: String,
      default: null,
      required: false
  },
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, secret);
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

UsersSchema.methods.getUser = function(){
  return {
    _id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    profession: this.profession,
    userpicUrl: this.userpicUrl
  }
}

mongoose.model('Users', UsersSchema);