const graphql = require('graphql');
const _ = require('lodash');
const Comment = require('../models/comment');
const Article = require('../models/article');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLString },
    text: { type: GraphQLString },
    article: {
      type: ArticleType,
      resolve(parent, args) {
        // return articles.find(article => article.comments.includes(parent.id));
      }
    }
  })
});

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
        // return parent.comments.map(id => comments.find(comment => id === comment.id) );
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comments: {
      type: new GraphQLList(CommentType),
      resolve() {
        // return comments;
      }
    },
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(comments, { id: args.id });
      }
    },

    articles: {
      type: new GraphQLList(ArticleType),
      resolve() {
        return articles;
      }
    },
    article: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(articles, { id: args.id });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArticle: {
      type: ArticleType,
      args: {
        date: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString }
      },
      resolve(parent, args) {
        let article = new Article({
          date: args.date,
          title: args.title,
          text: args.text
        });
        return article.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
