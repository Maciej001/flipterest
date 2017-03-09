import React from 'react';
import moment from 'moment'
import { Link } from 'react-router';

const AuthorInfo = ({handle, createdAt}) => (
  <h2 className="AuthorInfo">
    <Link to={`/profile/${handle}`}>
      <span className="bold">{handle}</span>
    </Link>
    {` on `}
    <span>{moment(createdAt).fromNow()}</span>
  </h2>
)

const Likes = ({likesNumber}) => (
  <div className="Likes">
    { likesNumber > 0
      ? <i className="fa fa-heart likes-red" aria-hidden="true">{` ${likesNumber}`}</i>
      : <i className="fa fa-heart-o likes-grey" aria-hidden="true"></i>
    }
  </div>
)

const Post = ({post}) => (
  <div className="Post">
    <div className="img-wrapper">
      <img src={post.imgUrl} alt=""/>
    </div>
    <div className="PostHeader">
      <AuthorInfo handle={post.handle} createdAt={post.createdAt}/>
      <Likes likesNumber={post.likes.length}/>
    </div>
    <p>{post.description}</p>
  </div>
)

export default Post;
