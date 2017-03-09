import dateType from 'graphql-date';

const resolvers = {

  Date: dateType,

  Query: {
    getPosts(obj, args, context) {
      console.log(`getPosts for handle: ${args.handle}`);
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
