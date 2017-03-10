import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App.jsx';
import Feed from './feed/Feed.jsx';
import FeedPostForm from './feed/FeedPostForm.jsx';

const Routes = () => (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Feed} />
      <Route path="/form" component={FeedPostForm} />
      <Route path="/profile/:handle" component={Feed} />
    </Route>
  </Router>
);

export default Routes;
