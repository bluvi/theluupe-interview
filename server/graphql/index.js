const { nexusPrisma } = require('nexus-plugin-prisma');
const { makeSchema, declarativeWrappingPlugin } = require('nexus');
const prisma = require('../lib/prisma');
const types = require('./schema');
const { decodeAuthHeader } = require('../utils/decode-auth-header');

const schema = makeSchema({
  types,
  plugins: [declarativeWrappingPlugin(), nexusPrisma({ experimentalCRUD: true, paginationStrategy: 'prisma' })],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/nexus.ts`,
  },
});

const context = ({ request }) => {
  const token = request?.headers?.authorization ? decodeAuthHeader(request.headers.authorization) : null;
  return {
    ...request,
    prisma,
    userId: token?.id,
  };
};

module.exports = {
  schema,
  context,
};
