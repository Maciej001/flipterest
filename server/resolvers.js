const resolvers = {
  Query: {
    getPosts(obj, args, context) {
      return context.Posts.getPosts(args.handle)
    },
  },
  Mutation: {
    createPost(obj, args, context) {
      return context.Posts.createPost({
        handle: args.handle,
        imgUrl: args.imgUrl,
        description: args.description
      })
    },
  },
};

export default resolvers;
