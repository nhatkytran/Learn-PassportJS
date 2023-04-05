const User = require('../models/userModel');
const signJWT = require('../utils/signJWT');

exports.userRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    await User.create({
      username,
      hashPassword: String(password),
    });

    res.status(201).json({
      status: 'success',
      message: 'Register successfully!',
    });
  } catch (error) {
    console.error('Something went wrong!');
    console.error(error);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = String(req.body.password);

    const user = await User.findOne({ username });

    if (!user || !(await user.correctPassword(password)))
      throw new Error('Incorrect email or password!');

    res.status(200).json({
      status: 'success',
      token: await signJWT(user._id),
      message: 'Welcome!',
    });
  } catch (error) {
    console.error('Something went wrong!');
    console.error(error);
  }
};
