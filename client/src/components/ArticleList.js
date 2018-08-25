import React, { Component } from 'react';
import { getArticlesQuery } from '../queries';
import ArticleInfo from './ArticleInfo';
import RemoveArticle from './RemoveArticle';
import { graphql } from 'react-apollo';

class ArticleList extends Component {
  state = {
    selected: null
  };

  render() {
    return (
      <div>
        <h1>Available Article List</h1>
        {this.showArticles()}
        <ArticleInfo articleId={this.state.selected} />
      </div>
    );
  }

  showArticles() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading articles ..</div>;
    } else {
      return (
        <ul>
          {data.articles.map(article => (
            <li key={article.id} onClick={() => this.handleClick(article.id)}>
              {article.title}
              <RemoveArticle id={article.id} />
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

export default graphql(getArticlesQuery)(ArticleList);
