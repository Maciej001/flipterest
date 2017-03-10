import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { createContainer } from 'meteor/react-meteor-data';

class AccountsUIWrapper extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, this.node);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return (
      <span ref={node => (this.node = node)} />
    )
  }
}

const AccountContainer = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, AccountsUIWrapper);

export default AccountContainer;
