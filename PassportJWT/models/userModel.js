const mongoose = require('mongoose');
const bcryptHash = require('../utils/bryptHash');
const bcryptCompare = require('../utils/bcryptCompare');

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    hashPassword: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

userSchema.pre('save', async function (next) {
  this.hashPassword = await bcryptHash(this.hashPassword, 12);

  next();
});

userSchema.methods.correctPassword = async function (password) {
  return await bcryptCompare(password, this.hashPassword);
};

const userCollectionName = 'users';
const User = mongoose.model('User', userSchema, userCollectionName);

module.exports = User;
