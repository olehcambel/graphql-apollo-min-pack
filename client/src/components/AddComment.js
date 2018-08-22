import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getArticlesQuery = gql`
  {
    articles {
      title
      id
    }
  }
`;

class AddComment extends Component {
  render() {
    return (
      <form>
        <div className="field">
          <label> Comment: </label>
          <input />
        </div>
        <div className="field">
          <label> user </label>
          <input />
        </div>
        <div className="field">
          <label> Article: </label>
          <select>
            <option>Select Article Title</option>
            {this.showArticles()}
          </select>
        </div>
      </form>
    );
  }

  showArticles() {
    const { data } = this.props;
    if (data.loading) {
      return <option disabled>Loading articles ..</option>;
    } else {
      return data.articles.map(article => (
        <option key={article.id}>{article.title}</option>
      ));
    }
  }
}

export default graphql(getArticlesQuery)(AddComment);
