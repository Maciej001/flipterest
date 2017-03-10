import React from "react" ;
import Account from '../Account.jsx';

const FeedHeader = (props)=>(
  <div className="FeedHeader">
    <h1>{props.title}</h1>
    <Account />
  </div>
)

export default FeedHeader;
