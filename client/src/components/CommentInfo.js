import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getCommentQuery } from '../queries';
import Comment from './Comment';
import Article from './Article';

class CommentInfo extends Component {
  render() {
    const { comment } = this.props.data;
    if (comment) {
      return (
        <div>
          <Comment comment={comment} full />
          <h3>Related Article</h3>
          <div>
            <Article article={comment.article} full />
            {/* {comment.article.title} by{' '} */}
            {/* {new Date(comment.article.date).toLocaleDateString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} */}
          </div>
          <p>Related comments to the article</p>
          <ul>
            {comment.article.comments.map(c => (
              <Comment key={c.id} comment={c} />
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>Empty. select something </div>;
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
