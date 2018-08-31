import React, { Fragment } from 'react';
import RemoveArticle from './RemoveArticle';
import EditArticle from './EditArticle';

const Article = ({ article, onClick, edit, full }) => {
  const handleClick = articleId => {
    if (!onClick) return;
    onClick(articleId);
  };

  if (full) {
    return (
      <div>
        <h3>Title: {article.title}</h3>
        {article.text && (
          <div>
            <b>Text: </b>
            {article.text}
          </div>
        )}
        <div>
          <b>Date:</b>{' '}
          {new Date(article.date).toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            // weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    );
  }

  return (
    <li onClick={() => handleClick(article.id)}>
      {article.title}

      {edit && (
        <Fragment>
          <RemoveArticle id={article.id} />
          <EditArticle id={article.id} />
        </Fragment>
      )}
    </li>
  );
};

export default Article;
