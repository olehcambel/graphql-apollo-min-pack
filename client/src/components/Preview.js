import React, { PureComponent, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { getPreviewQuery } from '../queries';
import Article from './Article';
import Comment from './Comment';

const ITEMS_PER_PAGE = 3;

class Preview extends PureComponent {
  state = {
    offset: 0,
    query: '',
    perPage: ITEMS_PER_PAGE,
    total: ITEMS_PER_PAGE
  };

  render() {
    const { offset } = this.state;
    const {
      data: { loading, error }
    } = this.props;
    if (error) return <h2 style={{ color: 'red' }}>{error.message}</h2>;
    if (loading) return <h2>Please wait. Loading Preview Mode ...</h2>;
    return (
      <Fragment>
        <h1>Preview Mode: Articles</h1>
        <div className="search-controls">
          <input
            value={this.state.query}
            onChange={this.handleQueryChange}
            placeholder="Search by article title"
          />
          <button onClick={this.search}>Search</button>
          <button onClick={this.resetSearch}>Reset Search</button>
        </div>
        <div className="articles">{this.renderArticles()}</div>
        <div className="controls">
          <button onClick={this.loadPreviousPage} disabled={offset === 0}>
            prev
          </button>
          <button onClick={this.loadNextPage}>next</button>
          <button onClick={this.loadMore}>More</button>
        </div>
      </Fragment>
    );
  }

  fetchPreviewQuery = (offset, query, perPage) => {
    const {
      data: { fetchMore }
    } = this.props;

    fetchMore({
      variables: {
        title: query,
        offset,
        first: perPage || this.state.perPage
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.articles.length) {
          return prev;
        }
        this.setState({
          offset,
          query,
          perPage: perPage || this.state.perPage,
          total: offset + fetchMoreResult.articles.length
        });
        return fetchMoreResult;
        // return {...prev,
        //   articles: [...prev.articles, ...fetchMoreResult.articles]
        // }
      }
    });

    // refetchQueries: [{ query: getArticlesQuery }]
  };

  handleQueryChange = event => {
    this.setState({
      query: event.target.value
    });
  };

  search = () => {
    const { query } = this.state;
    this.fetchPreviewQuery(0, query);
  };
  resetSearch = () => {
    this.fetchPreviewQuery(0, '');
  };

  loadNextPage = () => {
    const { offset, query, perPage } = this.state;
    const newOffset = offset + perPage;
    this.fetchPreviewQuery(newOffset, query);
  };

  loadPreviousPage = () => {
    const { offset, query, perPage } = this.state;
    const newOffset = offset - perPage < 0 ? 0 : offset - perPage;

    this.fetchPreviewQuery(newOffset, query);
  };

  loadMore = () => {
    const { offset, query, perPage, total } = this.state;
    const newPerPage = perPage <= total ? perPage + 1 : total;
    const newOffset = offset === 0 ? 0 : newPerPage;
    this.fetchPreviewQuery(newOffset, query, newPerPage);
  };

  renderArticles = () => {
    const { articles } = this.props.data;

    return articles.map(article => (
      <div className="article-card" key={article.id}>
        <Article article={article} full />
        <h2>Comments</h2>
        {article.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    ));
  };
}

export default graphql(getPreviewQuery, {
  options: () => ({
    variables: {
      first: ITEMS_PER_PAGE
    }
  })
})(Preview);
