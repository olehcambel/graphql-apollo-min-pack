import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getCommentsQuery } from '../queries';
import CommentInfo from './CommentInfo';

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
            <li
              key={comment.id}
              onClick={this.handleClick.bind(this, comment.id)}
            >
              {comment.user}
            </li>
          ))}
        </ul>
      );
    }
  }

  handleClick = (selected, e) => {
    this.setState({ selected });
  };
}

export default graphql(getCommentsQuery)(CommentList);
