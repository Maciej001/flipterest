import { Meteor } from 'meteor/meteor'
import { Posts } from '../collections';
import cloudinary from 'cloudinary';

class PostsRepository {
  constructor() {
    cloudinary.config({
      cloud_name: Meteor.settings.public.CLOUD_NAME,
      api_key: Meteor.settings.public.CLOUDINARY_API_KEY,
      api_secret: Meteor.settings.private.CLOUDINARY_API_SECRET,
    });
  }

  uploadImage(base64ImageData) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(base64ImageData, result => {
        if (result.error) {
          console.error(`Upload failed: ${result.error.message}`);
          reject(new Error(result.error.message));
        } else {
          const {secure_url, width, height, bytes} = result;
          resolve({url: secure_url, width, height, bytes});
        }
      });
    });
  }

  getPosts(handle) {
    if (!!handle)
      return Posts.find({handle}, {sort: {createdAt: -1}}).fetch();
    else
      return Posts.find({}, {sort: {createdAt: -1}}, {limit: 12}).fetch();
  }

  createPost(post) {
    const id = Posts.insert({ ...post, createdAt: new Date(), likes: [] });
    return Posts.findOne({_id: id});
  }

  addLike(userId, postId) {
    const post = Posts.findOne({_id: postId});
    if ( post.likes.indexOf(userId) === -1 ) {
      Posts.update( {_id: post._id}, {
        $push: { likes: userId }
      })
    }
    return userId;
  }

  /*
  follow(followee, follower, follow) {
    const followeeUser = Meteor.users.findOne({ handle : followee });
    const followerUser = Meteor.users.findOne({ handle : follower });
    try {
      if(follow) {
        Meteor.users.update({_id: followeeUser._id}, {$addToSet: {follower: follower}});
        Meteor.users.update({_id: followerUser._id}, {$addToSet: {followee: followee}});
      } else {
        Meteor.users.update({_id: followeeUser._id}, {$pull: {follower: follower}});
        Meteor.users.update({_id: followerUser._id}, {$pull: {followee: followee}});
      }
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  }
  */
}

export default PostsRepository
