import React from 'react';
import { Link } from 'react-router';

const Post = ({post}) => (
  <div className="Post">
    <img src={post.imgUrl} alt=""/>
    <div className="PostHeader">
      <span className="Author">
        <Link to={`/profile/${post.handle}`}>
          {`Created by @${post.handle} on ${post.createdAt}`}
        </Link>
      </span>
      <span className="Likes">{`Likes (${post.likes.length})`}</span>
    </div>
    <p>{post.description}</p>
  </div>
)

export default Post;
