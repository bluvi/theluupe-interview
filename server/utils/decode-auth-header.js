const jwt = require('jsonwebtoken');
const { config } = require('../config');

function decodeAuthHeader(authHeader) {
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (e) {
    return null;
  }
}

module.exports = {
  decodeAuthHeader,
};
