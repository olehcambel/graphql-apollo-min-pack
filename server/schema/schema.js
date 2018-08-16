const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const comments = [
  {
    id: 'qwerqwer',
    user: 'Gilliam Underwood',
    text:
      'Velit anim deserunt elit velit est fugiat duis eiusmod eu do incididunt ut tempor voluptate. Officia dolor aliqua id anim mollit pariatur id commodo. Laborum minim non ut aliquip commodo est consectetur. Mollit eu aliqua tempor est nulla ullamco irure. Sit non amet et eiusmod cillum ex cillum anim incididunt ad laboris mollit. Sunt quis incididunt elit ea qui non ullamco aliquip consequat voluptate eiusmod est. Irure laboris amet culpa sit aliquip.'
  },
  {
    id: 'lkjhsdlfkg',
    user: 'Dolly Franklin',
    text:
      'Aliquip id nostrud adipisicing irure. Labore reprehenderit ea ex officia ullamco incididunt consequat elit amet quis commodo. Fugiat amet veniam cillum ut aliquip velit est esse minim fugiat eiusmod sint. Commodo ea in culpa deserunt.'
  },
  {
    id: 'zxcvzcxvzxcv',
    user: 'Brennan Atkins',
    text:
      'Nisi sit nisi cillum dolor fugiat sint do nostrud ex cillum cupidatat. Culpa do duis non et excepteur labore dolor culpa qui tempor veniam. Ex labore deserunt qui sit aute ad incididunt do cupidatat eiusmod reprehenderit ad. Qui laborum qui voluptate velit et consectetur ipsum enim dolore minim. Est sint velit tempor reprehenderit. Qui consectetur ad minim consequat.'
  }
];

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
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
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(comments, { id: args.id });
      }
    }
  }
});

// comment(id: "zxcvzcxvzxcv") {
//   user
//   text
// }

module.exports = new GraphQLSchema({
  query: RootQuery
});
