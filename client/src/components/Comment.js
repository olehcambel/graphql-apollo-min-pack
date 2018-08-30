import React, { Fragment } from 'react';
import RemoveComment from './RemoveComment';

const Comment = ({ comment, onClick, edit, full }) => {
  const handleClick = commentId => {
    if (!onClick) return;
    onClick(commentId);
  };

  if (full) {
    return (
      <li>
        {comment.text} <b> by {comment.user}</b>
      </li>
    );
  }

  if (edit) {
    return (
      <Fragment>
        <li onClick={() => handleClick(comment.id)}>
          {comment.id}
          <RemoveComment id={comment.id} />
        </li>
      </Fragment>
    );
  }

  return <li>{comment.user}</li>;
};

export default Comment;
