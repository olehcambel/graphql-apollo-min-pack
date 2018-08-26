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
          <h3>Title: {article.title}</h3>
          <p>
            <b>Text: </b>
            {article.text}
          </p>
          <p>
            <b>Date: </b> {article.date}
          </p>
          <p>Other articles</p>
          <ul>
            {articles.map(article => (
              <li key={article.id}>{article.title}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>Empty ArticleInfo ... </div>;
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
