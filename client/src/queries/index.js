import { gql } from 'apollo-boost';

export const getCommentsQuery = gql`
  {
    comments {
      user
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
        }
      }
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

export const addArticleMutation = gql`
  mutation($title: String!, $text: String!) {
    addArticle(title: $title, text: $text) {
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

export const editArticleMutation = gql`
  mutation($id: ID!, $text: String!) {
    editArticle(id: $id, text: $text) {
      id
    }
  }
`;

export const getPreviewQuery = gql`
  query($title: String, $offset: Int, $first: Int) {
    articles(title: $title, offset: $offset, first: $first) {
      id
      title
      text
      date
      comments {
        id
        user
        text
      }
    }
  }
`;
