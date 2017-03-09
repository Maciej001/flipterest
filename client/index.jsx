import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Routes from './Routes.jsx';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const apolloClient = new ApolloClient();

Meteor.startup(() => {
  render(
    <ApolloProvider client={apolloClient}>
      <Routes />
    </ApolloProvider>,
    document.getElementById('root'),
  );
});
