import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { editArticleMutation } from '../queries';

class EditArticle extends PureComponent {
  state = { isOpen: false };

  render() {
    if (!this.state.isOpen) {
      return <button onClick={this.editClick}>edit</button>;
    }
    return (
      <form onSubmit={this.editSubmit}>
        <label htmlFor="text">text</label>
        <br />
        <textarea id="text" placeholder="edit text for article" />
        <br />
        <button action="submit">Save</button>
        <br />
      </form>
    );
  }

  editClick = e => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  editSubmit = e => {
    this.props.editArticleMutation({
      variables: {
        id: this.props.id,
        text: e.target.text.value
      }
      // refetchQueries: [{ query: getArticlesQuery }]
    });
  };
}

export default graphql(editArticleMutation, {
  name: 'editArticleMutation'
})(EditArticle);
