import React from 'react';
import { Meteor } from 'meteor/meteor';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Follow extends React.Component {

  componentDidMount() {
    console.log('componentDidMount: ', this.props);
    let isFollowing = false;
    let followeeUser = this.props.data.getUser;
    if(followeeUser && followeeUser.followers) {
      if(followeeUser.followers.contains(Meteor.userId())) {
        isFollowing = true;
      }
    }

    this.state = {
      followee: this.props.followee,
      isFollowing: isFollowing,
    };

  }

  handleClick() {
    let result = this.props.submit(this.state.followee, !this.state.isFollowing);
    console.log(`result for follow: ${result}`);
    if(result) {
      this.setState({
        isFollowing: !this.state.isFollowing,
      })
    } else {
      console.log('follow failed');
    }
  }

  render() {
    if(!this.state || !this.state.followee) {
      return null;
    }
    return (
      <a href="#" onClick={this.handleClick}>
        {this.state.isFollowing ? 'UnFollow' : 'Follow'}
      </a>
    );
  }

}

const query = gql`
  query getUser($followee: String) {
    getUser(handle: $followee) {
      followers
    }
  }
`

const mutation = gql`
  mutation follow($followee: String!, $follow: Boolean!){
    follow(followee: $followee, follow: $follow)
  }
`;

export default graphql(mutation, {
  props: ({ mutate, ownProps }) => {
    return {
      submit: (followee, follow) => {
        return mutate({
          variables: {
            followee: this.state.followee,
            follow: !this.state.isFollowing,
          },
        });
      },
    };
  },
}, query, {
  options: ownProps => ({
      variables: {
        followee: this.props.followee,
      },
    })
}
)(Follow);
