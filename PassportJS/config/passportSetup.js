const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/userModel');

dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({
          googleID: profile.id,
        });

        if (currentUser) {
          console.log('User already exists!');
          console.log(currentUser);
        } else {
          const user = await User.create({
            name: profile.displayName,
            googleID: profile.id,
          });

          console.log('Create new user!');
          console.log(user);
        }
      } catch (error) {
        console.error('Something went wrong!');
        console.error(error);
      }
    }
  )
);
