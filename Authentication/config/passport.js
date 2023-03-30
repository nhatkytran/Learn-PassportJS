const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../models/userModel');
const { validatePassword } = require('../utils/genPassword');

const LocalStrategy = passportLocal.Strategy;

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw',
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) throw new Error('User not found!');

    const valid = await validatePassword(password, user.hash, user.salt);

    if (!valid) throw new Error('Wrong password!');

    done(null, user);
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);

    if (user) done(null, user);
  } catch (error) {
    done(error);
  }
});
