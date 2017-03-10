import React, {Component} from 'react';

class FeedPostForm extends Component {
  state = {
    isUplaoding: false,
  }

  onChange = (e) => {

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
          <input className="SubmitButton" type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default FeedPostForm;
