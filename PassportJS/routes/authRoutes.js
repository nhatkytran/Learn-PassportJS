const express = require('express');
const passport = require('passport');

const {
  login,
  logout,
  authGoogle,
  authGoogleRedirect,
} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.route('/login').get(login);

authRouter.route('/logout').get(logout);

authRouter.route('/google').get(authGoogle);

authRouter.route('/google/redirect').get(
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
  }),
  authGoogleRedirect
);

module.exports = authRouter;
