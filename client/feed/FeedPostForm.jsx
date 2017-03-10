import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import fileToBase64 from '../utils/fileToBase64';

class FeedPostForm extends Component {
  state = {
    isUplaoding: false,
    base64ImageData: '',
    description: '',
  }

  onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({isUplaoding: true});

      fileToBase64(file)
        // .then(this.props.upload)
        .then((base64) => {
          this.setState({
            isUplaoding: false,
            base64ImageData: base64,
          })
        })
        .catch(error => {
          alert('upload failed: ' + error);
          this.setState({isUplaoding: false});
        });
    }
  }

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { description, base64ImageData } = this.state;
    this.props.submit(description, base64ImageData )
  }

  render() {
    const {isUploading} = this.state
    return (
      <div className="FeedPostForm">
        <h1>Share cool sh*t with your friends!</h1>
        <form>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            disabled={isUploading}
            onChange={this.onChange}
            className="ImageInput"
          />
          <textarea cols="60" rows="10" className="DescriptionInput"/>
          <input className="SubmitButton" type="submit" value="Submit" onClick={this.onSubmit}/>
        </form>
        { isUploading &&
          <span className="IsUploading">Uploading another boring photo...</span>
        }
      </div>
    );
  }
}

const mutation = gql`
  mutation createPost($description: String, $base64ImageData:Base64EncodedImage!){
    createPost(description: $description, base64ImageData: $base64ImageData) {
      _id
      handle
      imgUrl
      description
      createdAt
      likes
    }
  }
`;

export default graphql(mutation, {
  props: ({ mutate, ownProps }) => {
    return {
      submit: (description, base64ImageData) => {
        return mutate({
          variables: {
            description,
            base64ImageData,
          },
        });
      },
    };
  },
})(FeedPostForm);
