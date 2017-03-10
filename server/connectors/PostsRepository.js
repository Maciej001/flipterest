import { Posts } from '../collections';

class PostsRepository {
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
