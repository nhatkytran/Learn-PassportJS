const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    googleID: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
