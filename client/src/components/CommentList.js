import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getCommentsQuery } from '../queries';

class CommentList extends Component {
  render() {
    return (
      <div>
        <h1>Available Comment List</h1>
        {this.showComments()}
      </div>
    );
  }

  showComments() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading comments ..</div>;
    } else {
      return (
        <ul>
          {data.comments.map(comment => (
            <li key={comment.id}> {comment.user} </li>
          ))}
        </ul>
      );
    }
  }
}

export default graphql(getCommentsQuery)(CommentList);
