import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { getArticleQuery } from '../queries';
import Article from './Article';

class ArticleInfo extends Component {
  render() {
    const { article, articles } = this.props.data;
    if (article) {
      return (
        <Fragment>
          <Article article={article} full />

          <p>Other articles</p>
          <ul>
            {articles.map(article => (
              <Article key={article.id} article={article} />
            ))}
          </ul>
        </Fragment>
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
