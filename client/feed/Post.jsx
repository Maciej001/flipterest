import React from 'react';

const Post = ({post}) => (
  <div className="Post">
    <img src={post.imgUrl} alt=""/>
    <div className="PostHeader">
      <span className="Author">{`Created by @${post.handle} on ${post.createdAt}`}</span>
      <span className="Likes">`Likes (${post.likes})`</span>
    </div>
    <p>{post.description}</p>
  </div>
)

export default Post;
