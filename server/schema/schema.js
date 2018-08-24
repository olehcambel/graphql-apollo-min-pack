const graphql = require('graphql');
const _ = require('lodash');
const Comment = require('../models/comment');
const Article = require('../models/article');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
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
        return Article.findById(parent.articleId);
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
        return Comment.find({ articleId: parent.id });
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
        return Comment.find({});
      }
    },
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(comments, { id: args.id });
        return Comment.findById(args.id);
      }
    },

    articles: {
      type: new GraphQLList(ArticleType),
      resolve() {
        // return articles;
        return Article.find({});
      }
    },
    article: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(articles, { id: args.id });
        return Article.findById(args.id);
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
        date: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let article = new Article({
          date: args.date,
          title: args.title,
          text: args.text
        });
        return article.save();
      }
    },
    addComment: {
      type: CommentType,
      args: {
        user: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        articleId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let comment = new Comment({
          user: args.user,
          text: args.text,
          articleId: args.articleId
        });
        return comment.save();
      }
    },
    removeComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Comment.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

// TODO: при сохранении комментов в БД,
// как мне добавить id в массив коммента в  статье
// просто id генерируется в самом конце и реальо обновить не выйдет
