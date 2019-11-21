const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwt.secret');

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({success: false, message: 'Failed to authenticate token.'})
      } else {
        req.user = {
          id: decoded.id
        }
        next();
      }
    })
  } else {
    res.status(403).send({success: false, message: 'No token provided'});
  }
}

module.exports = checkToken;