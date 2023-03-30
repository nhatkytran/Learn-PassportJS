const passport = require('passport');
require('../config/passportSetup');

exports.login = (req, res) => {
  res.render('login');
};

exports.logout = (req, res) => {
  res.send('Logout with PassportJS');
};

exports.authGoogle = passport.authenticate('google', { scope: ['profile'] });

exports.authGoogleRedirect = (req, res) => {
  console.log('Login successfully!');

  res.redirect('/');
};
