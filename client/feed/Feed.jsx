import React from "react" ;
import FeedHeader from './FeedHeader.jsx';
import PostsFeed from './PostsFeed.jsx';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Feed = (props)=>{
  let title = '';
  if(props.params.handle) {
    title = `Posts by ${props.params.handle}`;
  } else {
    title = 'Recenty added';
  }

  if ( props.data.loading ) {
    return <div>Loading...</div>
  }


  return (
    <div className="thumbnail">
    <div className="Feed">
      <FeedHeader title={ title }/>
      <PostsFeed posts={props.data.getPosts} />
    </div>
  </div>
  )
}

const query = gql`
  query postsQuery($handle: String) {
    getPosts(handle: $handle) {
      _id
      handle
      imgUrl
      description
      createdAt
      likes
    }
  }
`
export default graphql(query, {
  options: ownProps => ({
      variables: { handle: ownProps.params.handle},
      //pollInterval: 1000,
    })
  }
)(Feed);
