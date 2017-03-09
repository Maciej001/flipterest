import React from "react" ;
import FeedHeader from './FeedHeader.jsx';
import PostsFeed from './PostsFeed.jsx';

const Feed = (props)=>{
  const posts = [
    {_id: 1, handle: 'user-1', imgUrl: 'https://s3.amazonaws.com/flipterest/fernando.jpg', createdAt: new Date(), likes: ['user-2', 'user-3'], description: 'Awesome image'},
    {_id: 2, handle: 'user-2', imgUrl: 'https://s3.amazonaws.com/flipterest/lukasz.jpg', createdAt: new Date(), likes: ['user-1', 'user-3'], description: 'More awesome image'},
    {_id: 3, handle: 'user-3', imgUrl: 'https://s3.amazonaws.com/flipterest/rainey.jpg', createdAt: new Date(), likes: ['user-1', 'user-2', 'user-3'], description: 'New image'},
  ]
  return (
    <div className="Feed">
      <FeedHeader title="Recently added"/>
      <PostsFeed posts={posts} />
    </div>
  )
}

export default Feed;
