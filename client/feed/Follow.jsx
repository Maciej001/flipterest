import React from 'react';
import { Meteor } from 'meteor/meteor';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Follow extends React.Component {

  componentWillReceiveProps(newProps) {

  }

  handleClick(e) {
    e.preventDefault();
    let result = this.props.submit(this.props.followee, !this.isFollowing());
    if(!result) {
      console.log('follow failed');
    }
  }

  isFollowing() {
    return this.props.data.getUser.followers.indexOf(Meteor.user().handle) > -1;
  }

  render() {
    if(this.props.data.loading || !Meteor.user()) {
      return <div>Loading...</div>
    }
    console.log('render isFollowing: ', this.isFollowing());
    return (
      <a href="#" onClick={this.handleClick.bind(this)}>
        {this.isFollowing() ? 'UnFollow' : 'Follow'}
      </a>
    );
  }

}

const query = gql`
  query getUser($followee: String!) {
    getUser(handle: $followee) {
      _id
      handle
      followers
    }
  }
`

const mutation = gql`
  mutation follow($followee: String!, $follow: Boolean!){
    follow(followee: $followee, follow: $follow)
  }
`;

const withMutation = graphql(mutation, {
  props: ({ mutate, ownProps }) => {
    return {
      submit: (followee, follow) => {
        return mutate({
          variables: {
            followee: followee,
            follow: follow,
          },
          updateQueries: {
            getUser: (previousResult, { mutationResult }) => {
              console.log(`previousResult`, previousResult);
              console.log('mutationResult: ', mutationResult);
              return previousResult;
            },
          },
        });
      },
    };
  },
});


const withQuery = graphql(query, {
  options: ownProps => ({
      variables: {
        followee: ownProps.followee,
      },
    })
  }
);

export default withMutation(withQuery(Follow));
