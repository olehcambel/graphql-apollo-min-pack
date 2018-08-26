import React, { Component } from 'react';
import { getPreviewQuery } from '../queries';
import { graphql } from 'react-apollo';

class CommentList extends Component {
  state = {};

  render() {
    const { articles, loading } = this.props.data;
    if (loading) {
      return <h2>Please wait. Loading Preview Mode ... </h2>;
    }
    return (
      <div>
        {articles.map(article => {
          const { title, text, date, comments, id } = article;
          return (
            <div key={id}>
              <h2>{title}</h2>
              <h5>{text}</h5>
              <h4>Date: {date}</h4>
              <h2>Comments</h2>
              {comments.map(comment => (
                <div key={comment.id}>
                  {comment.text} by {comment.user}
                </div>
              ))}
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default graphql(getPreviewQuery)(CommentList);
