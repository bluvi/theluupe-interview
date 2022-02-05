const { objectType } = require('nexus');

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.author();
    t.model.authorId();
    t.model.text();
  },
});

module.exports = {
  Post,
};
