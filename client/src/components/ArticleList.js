import React, { PureComponent } from 'react';
import { getArticlesQuery } from '../queries';
import ArticleInfo from './ArticleInfo';
import { graphql } from 'react-apollo';
import Article from './Article';

class ArticleList extends PureComponent {
  state = {
    selected: null
  };

  render() {
    return (
      <div>
        <h1>Available Article List</h1>
        {this.showArticles()}
        <hr />
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
            <Article
              key={article.id}
              onClick={this.handleClick}
              article={article}
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

export default graphql(getArticlesQuery)(ArticleList);
