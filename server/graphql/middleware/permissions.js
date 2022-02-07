const { rule, shield } = require('graphql-shield');

const r = {
  isAnybody: rule({ cache: 'contextual' })(() => true),
  isAuthenticatedUser: rule({ cache: 'contextual' })((_parent, _args, ctx) => {
    try {
      if (!ctx.userId) {
        return Error('Unauthenticated user');
      }
      return true;
    } catch (e) {
      return e;
    }
  }),
  isSameUser: rule({ cache: 'contextual' })(async (_parent, args, ctx) => {
    const id = args.where ? args.where.id : args.id;
    try {
      const user = await ctx.prisma.user.findUnique({ where: { id } });
      return ctx?.userId === user.id;
    } catch (e) {
      return e;
    }
  }),
  isPostOwner: rule({ cache: 'contextual' })(async (_parent, args, ctx) => {
    const id = args.where ? args.where.id : args.id;
    try {
      const author = await ctx.prisma.post
        .findUnique({
          where: {
            id,
          },
        })
        .author();
      return ctx?.userId === author?.id;
    } catch (e) {
      return e;
    }
  }),
};

const permissions = {
  Query: {
    user: r.isAnybody,
    users: r.isAnybody,
    post: r.isAnybody,
    posts: r.isAnybody,
    postsByUser: r.isAuthenticatedUser,
  },
  Mutation: {
    createOneUser: r.isAnybody,
    updateOneUser: r.isSameUser,
    signUp: r.isAnybody,
    signIn: r.isAnybody,
    createOnePost: r.isAuthenticatedUser,
    updateOnePost: r.isPostOwner,
    deleteOnePost: r.isPostOwner,
  },
};

const permissionsMiddleware = shield(permissions, {
  fallbackRule: r.isAnybody,
  // graphql-shield catches all resolver errors by default
  // This allows us to get some diagnostic data in all environments
  allowExternalErrors: true,
});

module.exports = {
  permissionsMiddleware,
};
