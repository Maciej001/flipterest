import { Meteor } from 'meteor/meteor';
import dateType from 'graphql-date';
import Base64EncodedImage from './base64EncodedImageType'

const resolvers = {
  Base64EncodedImage: Base64EncodedImage,
  Date: dateType,

  Query: {
    getPosts(obj, args, context) {
      //console.log(`getPosts for handle: ${args.handle}`);
      const posts = context.Posts.getPosts(args.handle);
      return posts;
    },
  },
  Mutation: {
    createPost(obj, args, context) {
      const { description, base64ImageData } = args;
      const user = context.user || {};
      const handle = (user.handle ? user.handle : 'Guest');

      return context.Posts.uploadImage(base64ImageData)
        .then((result) => {
          const {url} = result;

          return context.Posts.createPost({
            handle,
            description,
            imgUrl: url,
          })
        })
    },
    follow(obj, args, context) {
      const user = context.user || {};
      const handle = user.handle;
      if(!handle) {
        console.log('No follower passed');
        return false;
      }
      if(!args.followee) {
        console.log('No followee passed');
        return false;
      }
      return context.Users.follow(args.followee, user.handle, args.follow);
    }
  },
};

export default resolvers;
