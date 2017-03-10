import { Posts } from '../collections';

class PostsRepository {
  getPosts(handle) {
    console.log(`getPosts for handle: ${handle}`);
    if (!!handle)
      return Posts.find({handle}).fetch();
    else
      return Posts.find({}, {limit: 12}).fetch();
  }
  createPost(post) {
    const postWithDate = {...post, createdAt: new Date()};
    return Posts.insert({ postWithDate });
  }
}

export default PostsRepository
