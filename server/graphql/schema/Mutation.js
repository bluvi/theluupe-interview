const { mutationType } = require('nexus');
const { SignUpInput, SignInInput } = require('./User');
const { signUp, signIn } = require('./User/resolvers');

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.field('signUp', {
      type: 'UserTokenResponse',
      args: {
        data: SignUpInput,
      },
      resolve: signUp,
    });
    t.field('signIn', {
      type: 'UserTokenResponse',
      args: {
        data: SignInInput,
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
