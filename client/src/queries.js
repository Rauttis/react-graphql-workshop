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
      id,
      username
      displayName
      photo
      email
      bio
      tweets {
        id,
        tweet,
        createdAt
        from {
          id
          username
          displayName
          photo
          email
        }
      }
    }
  }
`;
