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
  GraphQLNonNull,
  GraphQLInt
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
      args: { offset: { type: GraphQLInt }, first: { type: GraphQLInt } },
      resolve(parent, args) {
        return Comment.find({})
          .skip(args.offset || null)
          .limit(args.first || null);
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
      args: {
        title: { type: GraphQLString },
        offset: { type: GraphQLInt },
        first: { type: GraphQLInt }
      },

      resolve(parent, args) {
        debugger;
        return Article.find(
          args.title ? { title: new RegExp(args.title, 'i') } : {}
        )
          .skip(args.offset || null)
          .limit(args.first || null);
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
        // date: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let article = new Article({
          date: new Date(),
          title: args.title,
          text: args.text
        });
        return article.save();
      }
    },
    removeArticle: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Article.findByIdAndRemove(args.id);
      }
    },
    editArticle: {
      type: ArticleType,
      args: { id: { type: GraphQLID }, text: { type: GraphQLString } },
      resolve(parent, args) {
        // return Article.findByIdAndUpdate((args.id, { text: args.text }));
        return Article.findById(args.id, (err, doc) => {
          if (err) return;
          doc.text = args.text;
          doc.date = new Date();
          doc.save();
        });
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
