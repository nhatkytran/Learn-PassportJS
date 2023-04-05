const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = fs.readFileSync(
  path.join(__dirname, '..', 'dev-data', 'privateKey.pem'),
  'utf-8'
);

const signJWT = id =>
  new Promise((resolve, reject) =>
    jwt.sign(
      { id },
      PRIVATE_KEY,
      { expiresIn: '1d', algorithm: 'RS256' },
      (error, token) => (error ? reject(error) : resolve(token))
    )
  );

module.exports = signJWT;
