const jwt = require('jsonwebtoken');
const { config } = require('../config');

function decodeAuthHeader(authHeader) {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  return jwt.verify(token, config.jwtSecret);
}

module.exports = {
  decodeAuthHeader,
};
