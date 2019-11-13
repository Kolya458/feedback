const mongoose = require('mongoose');
const passport = require('passport');
const Users = mongoose.model('Users');
const config = require('config');
const signUpRoute = config.get('routes.users.signUp');
const loginRoute = config.get('routes.users.login');

function createUser (req, res, next, user) {
    const finalUser = new Users(user);
  
    finalUser.setPassword(user.password);
  
    return finalUser.save()
      .then(() => res.json({ user: finalUser.toAuthJSON() })).catch(err => {console.log(err)}) ;

};

function loginUser(req, res, next) {
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
          return next(err);
        }
    
        if(passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();
    
          return res.json({ user: user.toAuthJSON() });
        }
        
        return res.status(400).send(info);
      })(req, res, next);
}
  
const getUserProfile = (req, res, next) => {

    const {id} = req.user;
  
    return Users.findById(id)
      .then((user) => {
        if(!user) {
          return res.sendStatus(400);
        }
  
        return res.json({ user: user.getUser() });
      });
}

const authAction = (req, res, next) => {

    const {user} = req.body;
  
    if(!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }
  
    if(!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }

    switch(req.url) {
        case signUpRoute: createUser(req, res, next, user);
            break;
    
        case loginRoute: loginUser(req, res, next);
            break;
    }
}
  
module.exports = {
    getUserProfile,
    authAction
}