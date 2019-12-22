const mongoose = require('mongoose');
const passport = require('passport');
const Users = mongoose.model('Users');
const jwt = require('jsonwebtoken');
const config = require('config');


const signUpRoute = config.get('routes.users.signUp');
const loginRoute = config.get('routes.users.login');
const rootRoute = config.get('routes.root');

const createUser = async (req, res, next, user) => {
    let isUserExists;
    await Users.findOne({email: user.email})
      .then(data => isUserExists = !!data)
      .catch(next);

    if(!isUserExists){
      const finalUser = new Users(user);
  
      finalUser.setPassword(user.password);
  
      return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() })).catch(next) ;
    } else {
      next(new Error('400:email already is used'))
    }
    

};

function loginUser(req, res, next) {
    return passport.authenticate('local', { session: false }, (err, passportUser) => {
        if(err) {
          return next(err);
        }
    
        if(passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();
    
          return res.json({ user: user.toAuthJSON() });
        }
        
        return next(new Error('400:something went wrong'));
      })(req, res, next);
}
  
const getUserProfile = (req, res, next) => {

    const {id} = req.user;
  
    return Users.findById(id)
      .then((user) => {
        if(!user) {
          return next(new Error('400:user not found'));
        }
  
        return res.json({ user: user.getUser()})
      })
      .catch(next);
}

const changeUserpic = (req, res, next) => {
  const {id} = req.user;
  const newUserpicUrl = req.file.filename

  Users.findByIdAndUpdate({_id: id}, {userpicUrl: newUserpicUrl})
    .then(user => {
      res.json({user: user.getUser()});
    })
    .catch(next);
}

const authAction = (req, res, next) => {

    const {user} = req.body;
  
    if(!user.email || !user.password){
      return next(new Error('400:email or password required'))
    }

    switch(req.url) {
        case signUpRoute: createUser(req, res, next, user);
            break;
    
        case loginRoute: loginUser(req, res, next);
            break;
    }
}

const deleteUser = (req, res, next) => {
  req.user.id === req.params.id?
    Users.deleteOne({_id: req.user.id}).then(
      () => {
        logout(req, res);
      }
    )
    .catch( err => next(err)) : 
    next(new Error('400:bad request'));
}

const logout = (req, res) => {
  req.logout();
  res.redirect(rootRoute);
}
  
module.exports = {
    getUserProfile,
    authAction,
    logout,
    changeUserpic,
    deleteUser
}