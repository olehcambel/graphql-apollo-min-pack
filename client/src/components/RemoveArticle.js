import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { removeArticleMutation, getArticlesQuery } from '../queries';

class RemoveArticle extends Component {
  state = {};

  render() {
    return <button onClick={this.removeArticle}>delete</button>;
  }

  removeArticle = e => {
    this.props.removeArticleMutation({
      variables: {
        id: this.props.id
      },
      refetchQueries: [{ query: getArticlesQuery }]
    });
  };
}

export default graphql(removeArticleMutation, {
  name: 'removeArticleMutation'
})(RemoveArticle);
