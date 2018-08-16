const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLString },
    user: { type: GraphQLString },
    text: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comment: {
      // kinda action, when someone is looking for /comment
      type: CommentType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
        // args.id
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
