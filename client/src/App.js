import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import CommentList from './components/CommentList';

// client setup for apollo
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <h2>Main page</h2>
        <CommentList />
      </ApolloProvider>
    );
  }
}

export default App;
