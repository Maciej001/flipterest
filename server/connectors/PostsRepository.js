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
    //console.log(`getPosts for handle: ${handle}`);
    if (!!handle)
      return Posts.find({handle}).fetch();
    else
      return Posts.find({}, {limit: 12}).fetch();
  }
  createPost(post) {
    const id = Posts.insert({ ...post, createdAt: new Date(), likes: [] });
    return Posts.findOne({_id: id});
  }
}

export default PostsRepository
