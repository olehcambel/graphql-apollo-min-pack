import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { removeCommentMutation, getCommentsQuery } from '../queries';

class RemoveComment extends Component {
  state = {};

  render() {
    return <button onClick={this.removeComment}>delete</button>;
  }

  removeComment = e => {
    this.props.removeCommentMutation({
      variables: {
        id: this.props.id
      },
      refetchQueries: [{ query: getCommentsQuery }]
    });
  };
}

export default graphql(removeCommentMutation, {
  name: 'removeCommentMutation'
})(RemoveComment);
