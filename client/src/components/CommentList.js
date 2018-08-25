import React, { Component } from 'react';
import { getCommentsQuery } from '../queries';
import CommentInfo from './CommentInfo';
import RemoveComment from './RemoveComment';
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
            <li
              key={comment.id}
              onClick={this.handleClick.bind(this, comment.id)}
            >
              {comment.id}
              <RemoveComment id={comment.id} />
            </li>
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
