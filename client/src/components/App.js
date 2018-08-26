import React, { Component } from 'react';
// import CommentList from './CommentList';
import Preview from './Preview';
import Sidebar from './Sidebar';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route
  // Switch,
  // Link
} from 'react-router-dom';
import FormCreator from './FormCreator';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrap">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/form-creator" component={FormCreator} />
            <Route path="/preview" component={Preview} />
            {/* <Route path="/preview" component={CommentList} /> */}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
