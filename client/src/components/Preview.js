import React, { Fragment } from 'react';
import { getPreviewQuery } from '../queries';
import { graphql } from 'react-apollo';
import Article from './Article';
import Comment from './Comment';

const Preview = ({ data: { articles, loading } }) => {
  if (loading) {
    return <h2>Please wait. Loading Preview Mode ... </h2>;
  }
  return (
    <Fragment>
      {articles.map(article => (
        <div key={article.id}>
          <Article article={article} full />

          <h2>Comments</h2>
          {article.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <hr />
        </div>
      ))}
    </Fragment>
  );
};

export default graphql(getPreviewQuery)(Preview);
