import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addArticleMutation, getArticlesQuery } from '../queries';

class AddArticle extends Component {
  state = {
    title: '',
    text: ''
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <h1>Add Article</h1>

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

    this.props.addArticleMutation({
      variables: {
        title: this.state.title,
        text: this.state.text
      },
      refetchQueries: [{ query: getArticlesQuery }]
    });
  };
}

export default graphql(addArticleMutation, { name: 'addArticleMutation' })(
  AddArticle
);
