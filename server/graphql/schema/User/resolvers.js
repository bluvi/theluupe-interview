const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../../../config');

function fullName(parent) {
  const { firstName, lastName } = parent;
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  return null;
}

async function signUp(_, args, context) {
  const { data } = args;
  const existingUser = await context.prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error('Email already used');
  }

  const hash = bcrypt.hashSync(data.password, 10);

  const { password, ...userData } = await context.prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hash,
    },
  });

  const token = jwt.sign(userData, config.jwtSecret, { expiresIn: '1w' });

  return {
    user: userData,
    accessToken: token,
  };
}

async function signIn(_, args, context) {
  const { data } = args;
  const user = await context.prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const { password, ...userData } = user;
  const isValidPassword = await bcrypt.compareSync(data.password, password);

  if (!isValidPassword) {
    throw new Error('Not possible to sign in');
  }

  const token = jwt.sign(userData, config.jwtSecret, { expiresIn: '1w' });

  return {
    user: userData,
    accessToken: token,
  };
}

module.exports = {
  fullName,
  signUp,
  signIn,
};
