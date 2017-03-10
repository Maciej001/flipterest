import dateType from 'graphql-date';

const resolvers = {

  Date: dateType,

  Query: {
    getPosts(obj, args, context) {
      //console.log(`getPosts for handle: ${args.handle}`);
      const posts = context.Posts.getPosts(args.handle);
      console.log("getPosts: ", posts);
      return posts;
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
