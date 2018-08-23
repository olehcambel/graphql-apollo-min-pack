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

export const getArticlesQuery = gql`
  {
    articles {
      title
      id
    }
  }
`;
