const { objectType, inputObjectType } = require('nexus');

const { fullName } = require('./resolvers');

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.firstName();
    t.model.lastName();
    t.string('fullName', { resolve: fullName });
    t.list.field('posts', {
      type: 'Post',
      resolve(root, _args, context) {
        return context.prisma.user.findUnique({ where: { id: root.id } }).posts();
      },
    });
    t.int('totalPosts', {
      resolve(root, _args, context) {
        return context.prisma.post.count({ where: { authorId: root.id } });
      },
    });
  },
});

const SignUpData = inputObjectType({
  name: 'SignUpData',
  definition(t) {
    t.nonNull.string('email');
    t.nullable.string('firstName');
    t.nullable.string('lastName');
    t.nonNull.string('password');
  },
});

const SignInData = inputObjectType({
  name: 'SignInData',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

const UserTokenResponse = objectType({
  name: 'UserTokenResponse',
  definition(t) {
    t.field('user', {
      type: 'User',
      nullable: false,
    });
    t.string('accessToken');
  },
});

module.exports = {
  User,
  SignUpData,
  SignInData,
  UserTokenResponse,
};
