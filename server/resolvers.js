import dateType from 'graphql-date';

const resolvers = {

  Date: dateType,

  Query: {
    getPosts(obj, args, context) {
      //console.log(`getPosts for handle: ${args.handle}`);
      return context.Posts.getPosts(args.handle)
    },
  },
  Mutation: {
    createPost(obj, args, context) {
      const user = context.user || {};
      const handle = (user.handle ? user.handle : 'Guest');
      console.log(`Pass handle: ${handle}`);
      return context.Posts.createPost({
        handle: handle,
        imgUrl: args.imgUrl,
        description: args.description
      })
    },
  },
};

export default resolvers;
