import { Posts } from '../collections';

class PostsRepository {
  getPosts(handle) {
    if (!!handle)
      return Posts.find({handle}).fetch();
    else
      return Posts.find({}, {limit: 12});
  }
  createPost(post) {
    return Posts.insert({ post });
  }
}

export default PostsRepository
