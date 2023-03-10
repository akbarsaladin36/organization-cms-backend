const helper = require('../helpers/helper')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  userAuthentication: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      // validating token process
      jwt.verify(token, process.env.JWT_SECRETKEY, (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please login first to website as user!')
    }
  },

  isAdmin: (req, res, next) => {
    // console.log(req.decodeToken);
    if (req.decodeToken.roles_id === 1) {
      next()
    } else {
      return helper.response(res, 403, 'this page can be accessed by admin!')
    }
  }
}
