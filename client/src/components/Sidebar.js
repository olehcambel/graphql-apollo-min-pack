import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/form-creator">Form Creator</Link>
        </div>
        <div>
          <Link to="/preview">Preview</Link>
        </div>
      </Fragment>
    );
  }
}

export default Sidebar;
