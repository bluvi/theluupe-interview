const { mutationType } = require('nexus');
const { SignUpData, SignInData } = require('./User');
const { signUp, signIn } = require('./User/resolvers');

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.field('signUp', {
      type: 'UserTokenResponse',
      args: {
        data: SignUpData,
      },
      resolve: signUp,
    });
    t.field('signIn', {
      type: 'UserTokenResponse',
      args: {
        data: SignInData,
      },
      resolve: signIn,
    });
    t.crud.createOnePost();
    t.crud.updateOnePost();
    t.crud.deleteOnePost();
  },
});

module.exports = {
  Mutation,
};
