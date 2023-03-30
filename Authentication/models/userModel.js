const mongoose = require('mongoose');
const { connection } = require('../config/database');

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    hash: { type: String },
    salt: { type: String },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const userCollectionName = 'users';
const User = connection.model('User', userSchema, userCollectionName);

module.exports = User;
