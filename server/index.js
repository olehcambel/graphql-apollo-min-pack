const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'editor.cursorShape': 'line',
      'editor.theme': 'light'
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🆗  Server ready at ${url}`);
});
