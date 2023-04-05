const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');

const PUBLIC_KEY = fs.readFileSync(
  path.join(__dirname, '..', 'dev-data', 'publicKey.pem'),
  'utf-8'
);

const options = {
  // jwtFromRequest: function (req) {
  //   console.log(req);
  // },
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithms: ['RS256'],
};

const verifyCallback = async (jwt_payload, done) => {
  try {
    console.log(jwt_payload);
    const user = await User.findOne({ _id: jwt_payload.id });

    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(err, false);
  }
};

const strategy = new JwtStrategy(options, verifyCallback);

passport.use(strategy);
