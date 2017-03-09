import React from "react" ;
import FeedHeader from './FeedHeader.jsx';
import PostsFeed from './PostsFeed.jsx';

const Feed = (props)=>{
  const posts = [
    {_id: 1, handle: 'user-1', imgUrl: 'https://s3.amazonaws.com/flipterest/fernando.jpg', createdAt: new Date(), likes: ['user-2', 'user-3'], description: 'Fernando presenting his project'},
    {_id: 2, handle: 'user-2', imgUrl: 'https://s3.amazonaws.com/flipterest/lukasz.jpg', createdAt: new Date(), likes: ['user-1', 'user-3'], description: 'Lukasz'},
    {_id: 3, handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/rainey.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Rainey'},
    {_id: 4, handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/tarkan.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Tarkan'},
    {_id: 5, handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/sacha1.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Sacha'},
    {_id: 6, handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/sacha2.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Sacha 2'},
    {_id: 7, handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/sacha3.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Sacha 3'},
    {_id: 8, handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/sacha4.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'Sacha 4'},
  ]
  return (
    <div className="Feed">
      <FeedHeader title="Recently added"/>
      <PostsFeed posts={posts} />
    </div>
  )
}

export default Feed;
