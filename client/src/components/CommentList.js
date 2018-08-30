import React, { Component } from 'react';
import { getCommentsQuery } from '../queries';
import CommentInfo from './CommentInfo';
import Comment from './Comment';
import { graphql } from 'react-apollo';

class CommentList extends Component {
  state = {
    selected: null
  };

  render() {
    return (
      <div>
        <h1>Available Comment List</h1>
        {this.showComments()}
        <CommentInfo commentId={this.state.selected} />
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
            <Comment
              key={comment.id}
              comment={comment}
              onClick={this.handleClick}
              edit
            />
          ))}
        </ul>
      );
    }
  }

  handleClick = selected => {
    this.setState({ selected });
  };
}

export default graphql(getCommentsQuery)(CommentList);
