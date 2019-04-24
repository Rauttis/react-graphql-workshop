import gql from 'graphql-tag';

const userFields = gql`
  fragment userFields on User {
    id
    username
    displayName
    photo
    email
    bio
  }
`

export const allTweetsQuery = gql`
  query getAllTweets {
    tweets {
      id
      createdAt
      tweet
      from {
        ...userFields
      }
    }
  }
  ${userFields}
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
  ${userFields}
`;

export const createTweetMutation = gql`
  mutation createTweet($tweet: String!, $from: String!) {
    createTweet(tweet: $tweet, from: $from) {
      id
      tweet
      createdAt
      from {
        ...userFields
      }
    }
  }
  ${userFields}
`;
