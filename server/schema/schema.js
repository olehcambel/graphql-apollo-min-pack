const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

const eComments = [{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }];
const eArticles = [
  { id: 'a1', ecomments: ['c1', 'c3'] },
  { id: 'a2', ecomments: ['c1', 'c2'] }
];

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

const articles = [
  {
    id: '56c782f18990ecf954f6e027',
    date: '2018-06-09T15:03:23.000Z',
    title: 'React is awesome',
    text:
      'Commodo qui incididunt ex ut ea nulla et eu aliquip duis. Aute deserunt excepteur ullamco fugiat sunt aliquip exercitation do sint incididunt. Amet consectetur sint irure reprehenderit fugiat amet mollit. In commodo mollit ullamco cillum pariatur eiusmod cillum aute mollit. Culpa non sint eiusmod ad dolor velit dolore voluptate do adipisicing. Cupidatat sint est magna officia qui magna eu elit qui excepteur fugiat duis ex labore.\n\nAliquip veniam ad reprehenderit mollit exercitation id enim ut exercitation. Esse irure ipsum minim laborum reprehenderit irure ut. Tempor excepteur nisi nulla nostrud amet id cillum. Sint velit sint officia aliqua sint quis deserunt.\n\nAliquip dolor cillum deserunt enim nulla dolor amet irure cupidatat commodo laboris id aliqua. Labore aliqua adipisicing Lorem id adipisicing. Ad cupidatat et do anim ex commodo elit magna ad consequat. Nostrud sit eu laborum ut consequat fugiat aute culpa. Lorem tempor quis sunt ad consequat excepteur est. Enim voluptate cillum Lorem ex fugiat ea qui. Irure aute magna dolore eiusmod minim non ad anim dolore sint et.',
    comments: ['qwerqwer', 'lkjhsdlfkg', 'zxcvzcxvzxcv', 'ertyoertywte']
  },
  {
    id: '56c782f17b4e0ba78c7ad717',
    date: '2018-04-09T18:03:23.000Z',
    title: 'Vue is awesome?',
    text:
      'Quis occaecat duis aliqua reprehenderit excepteur nisi deserunt excepteur elit magna. Magna cillum anim veniam deserunt voluptate occaecat irure fugiat laboris proident. Tempor do magna deserunt cillum laborum cillum ut.\n\nEst sunt cupidatat in deserunt sit aliqua duis. Mollit consequat duis aliquip occaecat pariatur non do eiusmod dolore amet deserunt ullamco. Ea minim tempor exercitation do tempor nostrud dolor minim veniam laboris commodo ex duis. Do nostrud voluptate ullamco consequat anim tempor voluptate incididunt aliqua tempor.\n\nIn irure quis nostrud do. Labore laboris irure culpa reprehenderit pariatur laboris in commodo culpa enim cillum magna. Magna ipsum pariatur sunt in reprehenderit ipsum duis officia voluptate adipisicing ad officia. Duis est sint mollit amet laborum magna non quis nulla ipsum in veniam sit. Amet velit consequat esse esse ea. Ipsum non do ut cillum in adipisicing labore non commodo do laborum sunt.',
    comments: ['qwerqwertyy', 'sdfgsdfghu7u7urtv']
  }
];

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLString },
    text: { type: GraphQLString },
    article: {
      type: ArticleType,
      resolve(parent, args) {
        return articles.find(article => article.comments.includes(parent.id));
        // return _.find(articles, { id: parent.articleId });
      }
    }
  })
});
// to find article
// eArticles.find(eA => eA.comments.includes(eComments[2].id))

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        // return _.filter(comments, { articleId: parent.id });
        return parent.comments.map(id =>
          comments.find(comment => id === comment.id)
        );
      }
    }
  })
});
// to find comments
// eArticles[0].comments.map(id => eComments.find(comment => id === comment.id))

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comment: {
      // kinda action, when someone is looking for /comment
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(comments, { id: args.id });
      }
    },
    article: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(articles, { id: args.id });
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
