import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArticleQuery } from '../queries';

class ArticleInfo extends Component {
  render() {
    const { article, articles } = this.props.data;
    if (article) {
      debugger;
      return (
        <div>
          <h3>{article.title}</h3>
          <p>{article.text}</p>
          <p>Date: {article.date}</p>
          <p>Other articles</p>
          <ul>
            {articles.map(article => (
              <li key={article.id}>{article.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>Empty. write something </div>;
    }
  }
}

export default graphql(getArticleQuery, {
  options: props => ({
    variables: {
      id: props.articleId
    }
  })
})(ArticleInfo);
