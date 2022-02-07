const { queryType } = require('nexus');
const { PostsByUserInput } = require('./Post');

const Query = queryType({
  definition(t) {
    t.crud.user({ filtering: true });
    t.crud.users({ ordering: true, filtering: true, paginating: true });
    t.crud.post({ filtering: true });
    t.crud.posts({ ordering: true, filtering: true, paginating: true });
    t.list.field('postsByUser', {
      type: 'Post',
      args: {
        data: PostsByUserInput,
      },
      resolve(_root, args, context) {
        return context.prisma.post.findMany({ where: { authorId: { equals: args.data.authorId } } });
      },
    });
  },
});

module.exports = {
  Query,
};
