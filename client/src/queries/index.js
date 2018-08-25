import { gql } from 'apollo-boost';

export const getCommentsQuery = gql`
  {
    comments {
      user
      id
    }
  }
`;

export const addCommentMutation = gql`
  mutation($user: String!, $text: String!, $articleId: String!) {
    addComment(user: $user, text: $text, articleId: $articleId) {
      user
      id
    }
  }
`;

export const removeCommentMutation = gql`
  mutation($id: ID!) {
    removeComment(id: $id) {
      id
    }
  }
`;

export const getCommentQuery = gql`
  query($id: ID) {
    comment(id: $id) {
      id
      user
      text
      article {
        id
        title
        date
        comments {
          id
          user
          text
        }
      }
    }
  }
`;

export const getArticlesQuery = gql`
  {
    articles {
      title
      id
    }
  }
`;

export const getArticleQuery = gql`
  query($id: ID) {
    article(id: $id) {
      id
      date
      title
      text
    }
    articles {
      id
      title
    }
  }
`;

// {
//   article(id: "5b7cc27beeb6b1286844eb45") {
//       id
//       date
//       title
//       text
//   }
// }

export const getArticleMutation = gql`
  mutation($date: String!, $title: String!, $text: String!) {
    addArticle(date: $date, title: $title, text: $text) {
      title
      id
    }
  }
`;

export const removeArticleMutation = gql`
  mutation($id: ID!) {
    removeArticle(id: $id) {
      id
    }
  }
`;
