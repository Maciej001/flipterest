import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router'

class AccountsUIWrapper extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, this.node);
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return (
      <div className="RightMenu">
        { !!Meteor.user() &&
          <Link to="/form" className="AddPost">Add Post</Link>
        }
        <span className="Login" ref={node => (this.node = node)} />
      </div>
    )
  }
}

const AccountContainer = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, AccountsUIWrapper);

export default AccountContainer;
