import gql from 'graphql-tag';

export const allTweetsQuery = gql`
  query getAllTweets {
    tweets {
      id
      createdAt
      tweet
      from {
        id
        username
        email
        displayName
        photo
      }
    }
  }
`;

export const userQuery = gql`
  query getUser($username: String!) {
    user(username: $username) {
      ...userFields
      tweets {
        id,
        tweet,
        createdAt
        from {
          ...userFields
        }
      }
    }
  }
  fragment userFields on User {
    id
    username
    displayName
    photo
    email
    bio
  }
`;
