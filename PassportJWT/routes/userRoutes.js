const express = require('express');
const passport = require('passport');
const { userRegister, userLogin } = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);

userRouter.get(
  '/protectedResource',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).json({
      status: 'success',
      message: 'Hello beautiful World!',
    });
  }
);

module.exports = userRouter;
