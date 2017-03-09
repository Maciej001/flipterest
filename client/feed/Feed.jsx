import React from "react" ;
import FeedHeader from './FeedHeader.jsx';
import PostsFeeds from './PostsFeed.jsx';

const Feed = (props)=>(
  <div className="Feed">
    <FeedHeader />
    <PostsFeeds />
  </div>
)

export default Feed;
