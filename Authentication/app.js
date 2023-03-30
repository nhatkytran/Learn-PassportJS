const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');

const User = require('./models/userModel');
const { genPassword } = require('./utils/genPassword');

const app = express();

const { sessionOptions } = require('./config/database');
require('./config/passport');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session(), (error, req, res, next) => {
  if (error) {
    console.error('Catch Error!');
    console.error(error);
  }

  next();
});

// app.get('/', (req, res, next) => {
//   if (!req.session.timesVisit) req.session.timesVisit = 1;
//   else req.session.timesVisit += 1;

//   res
//     .status(200)
//     .json({ message: `Hello beautiful World!`, times: req.session.timesVisit });
// });

app.get('/test', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    session: req.session,
    user: req.user,
  });
});

app.get('/', (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

app.get('/login-success', (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

app.get('/login', (req, res, next) => {
  const form = `
    <h1>Login Page</h1>
    <form method="POST" action="/login">
      Enter Username:
      <br>
      <input type="text" name="uname">
      <br>
      Enter Password:
      <br>
      <input type="password" name="pw">
      <br>
      <br>
      <input type="submit" value="Submit">
    </form>
  `;

  res.send(form);
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/login-success',
  }),
  (error, req, res, next) => {
    console.error('Hey! Something went wrong!');
    console.error(error);

    console.log('Hello beautiful World!');
    res.send('Hello');
  }
);

app.get('/register', (req, res, next) => {
  const form = `
    <h1>Register Page</h1>
    <form method="post" action="register">
      Enter Username:
      <br>
      <input type="text" name="uname">
      <br>
      Enter Password:
      <br>
      <input type="password" name="pw">
      <br><br><input type="submit" value="Submit">
    </form>'
  `;

  res.send(form);
});

app.post('/register', async (req, res, next) => {
  try {
    const { uname, pw } = req.body;

    if (!uname || !pw) throw new Error('uname and pw not provided!');

    const { salt, hashPassword } = await genPassword(pw);

    const user = await User.create({
      username: uname,
      salt,
      hash: hashPassword,
    });

    if (!user) throw new Error('Create error!');

    res.redirect('/login');
  } catch (error) {
    console.error('Something went wrong registering new user!');
    console.error(error);
  }
});

module.exports = app;
