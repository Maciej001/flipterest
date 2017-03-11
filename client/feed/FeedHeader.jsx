import React from 'react';
import Account from '../Account.jsx';
import Follow from './Follow.jsx';

// <Follow followee={props.followee} />
const FeedHeader = (props)=>(
  <div className="FeedHeader">
    <h1>{props.title}</h1>
    {
      props.followee ? <Follow followee={props.followee} /> : null
    }
    <Account />
  </div>
)

export default FeedHeader;
