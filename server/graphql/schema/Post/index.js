const { objectType, inputObjectType } = require('nexus');

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.author();
    t.model.authorId();
    t.model.title();
    t.model.text();
  },
});

const PostsByUserInput = inputObjectType({
  name: 'PostsByUserInput',
  definition(t) {
    t.nonNull.string('authorId');
  },
});

module.exports = {
  Post,
  PostsByUserInput,
};
