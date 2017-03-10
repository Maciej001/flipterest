import {Meteor} from 'meteor/meteor'
import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

class Likes extends Component {
  onClick = (e) => {
    if (!!Meteor.user()) {
      this.props.addLike(Meteor.userId(), this.props.postId)
    }
  }

  render() {
    const { likesNumber } = this.props;
    return (
      <div className="Likes">
        { likesNumber > 0
          ? <i className="fa fa-heart likes-red" aria-hidden="true" onClick={this.onClick}>{` ${likesNumber}`}</i>
          : <i className="fa fa-heart-o likes-grey" aria-hidden="true" onClick={this.onClick}></i>
        }
      </div>
    )
  }
}

const mutation = gql`
  mutation addLike($userId: String!, $postId:String!){
    addLike(userId: $userId, postId: $postId) {
      _id
    }
  }
`;

export default graphql(mutation, {
  props: ({ mutate, ownProps }) => {
    return {
      addLike: (userId, postId) => {
        return mutate({
          variables: {
            userId,
            postId,
          },
          updateQueries: {
            getPosts: (previousResult, { mutationResult }) => {
              console.log(`previousResult`, previousResult);
              console.log(`mutationResult:  ${mutationResult}`);
              return update(previousResult, {
                post: {
                  likes: {
                    $push: [mutationResult.data.post._id],
                  },
                },
              });
            },
          },
        }
      );
      },
    };
  },
})(Likes);
