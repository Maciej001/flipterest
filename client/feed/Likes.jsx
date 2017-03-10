import React, { Component } from 'react';

class Likes extends Component {
  render() {
    const { likesNumber } = this.props;
    return (
      <div className="Likes">
        { likesNumber > 0
          ? <i className="fa fa-heart likes-red" aria-hidden="true">{` ${likesNumber}`}</i>
          : <i className="fa fa-heart-o likes-grey" aria-hidden="true"></i>
        }
      </div>
    )
  }
}

export default Likes
