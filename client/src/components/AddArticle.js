import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getArticleMutation, getArticlesQuery } from '../queries';

class AddArticle extends Component {
  state = {
    date: '',
    title: '',
    text: ''
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <label> Date: </label>
          <input name="date" onChange={this.handleChange} />
        </div>
        <div>
          <label> Title: </label>
          <input name="title" onChange={this.handleChange} />
        </div>
        <div>
          <label> Text: </label>
          <input name="text" onChange={this.handleChange} />
        </div>
        <button>+</button>
      </form>
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();

    this.props.getArticleMutation({
      variables: {
        date: this.state.date,
        title: this.state.title,
        text: this.state.text
      },
      refetchQueries: [{ query: getArticlesQuery }]
    });
  };
}

export default graphql(getArticleMutation, { name: 'getArticleMutation' })(
  AddArticle
);
