import React from "react" ;
import Post from './Post.jsx';

const PostsFeed = (props)=>(
  <div className="PostsFeed">
    {
      props.posts.map(post => (
        <Post key={post._id} post={post} />
      ))
    }
  </div>
)

export default PostsFeed;
