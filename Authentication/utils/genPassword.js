const crypto = require('crypto');

exports.genPassword = password =>
  new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(32).toString('hex');

    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (error, hash) =>
      !error
        ? resolve({ salt, hashPassword: hash.toString('hex') })
        : reject(error)
    );
  });

exports.validatePassword = (password, hashPassword, salt) =>
  new Promise((resolve, reject) =>
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (error, hash) =>
      !error ? resolve(hash.toString('hex') === hashPassword) : reject(error)
    )
  );
