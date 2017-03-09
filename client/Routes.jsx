import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App.jsx';
import Feed from './feed/Feed.jsx';

const Routes = () => (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Feed} />
      <Route path="/profile/:handle" component={Feed} />
    </Route>
  </Router>
)

export default Routes;



/*
If you use this syntax you have to include it in index.jsx as follows:
Meteor.startup(() => {
  render(
    Routes,
    document.getElementById('root'),
  );
});

export default <Router history={browserHistory}>
  <Route component={App}>
    <Route path="/" component={Feed} />
  </Route>
</Router>;
*/
