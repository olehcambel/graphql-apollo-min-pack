import React from 'react';
import AddComment from './AddComment';
import AddArticle from './AddArticle';
import CommentList from './CommentList';
import ArticleList from './ArticleList';
import { Route, Link } from 'react-router-dom';

const FormCreator = ({ match }) => (
  <div>
    <h2>Choose form to edit</h2>
    <ul>
      <li>
        <Link to={`${match.url}/article`}>edit Article</Link>
      </li>
      <li>
        <Link to={`${match.url}/comment`}>edit Comment</Link>
      </li>
    </ul>

    <Route
      path={`${match.url}/comment`}
      render={props => (
        <div>
          <AddComment />
          <CommentList />
        </div>
      )}
    />
    <Route
      path={`${match.url}/article`}
      render={props => (
        <div>
          <AddArticle />
          <ArticleList />
        </div>
      )}
    />

    {/* <Route path={`${match.url}/article`} component={AddArticle} /> */}
    {/* <Route path={`${match.url}/comment`} component={AddComment} /> */}
    <Route exact path={match.url} render={() => <h4>Choose one of link</h4>} />
  </div>
);

export default FormCreator;
