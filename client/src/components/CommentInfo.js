import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getCommentQuery } from '../queries';

class CommentInfo extends Component {
  render() {
    const { comment } = this.props.data;
    if (comment) {
      return (
        <div>
          <h3>{comment.user}</h3>
          <p>
            {comment.text}
            <b> by {comment.user}</b>{' '}
          </p>
          <p>Other comments by users</p>
          <ul className="other-comments">
            {comment.article.comments.map(c => (
              <li key={c.id}>{c.user}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>Empty. write something </div>;
    }
  }
}

export default graphql(getCommentQuery, {
  options: props => ({
    variables: {
      id: props.commentId
    }
  })
})(CommentInfo);
