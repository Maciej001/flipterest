import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

Meteor.startup(() => {
  render(
    <div>Hello, world!</div>,
    document.getElementById('root'),
  );
});
