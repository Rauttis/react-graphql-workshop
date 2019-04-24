const { gql } = require('apollo-server')

module.exports = gql`
  type Query {
    user(username: String!): User
    users: [User]!
    tweet(id: ID!): Tweet
    tweets: [Tweet]!
    me: User
  }

  type Mutation {
    createUser(
      username: String!,
      displayName: String,
      bio: String,
      photo: String
    ): User
    updateUser(
      username: String!,
      displayName: String,
      bio: String,
      photo: String
    ): User
    deleteUser(id: ID!): User
    createTweet(tweet: String!, from: String!): Tweet
    deleteTweet(id: ID!): Tweet
  }

  type Subscription {
    tweetAdded: Tweet
  }

  type User {
    id: ID!
    createdAt: String!
    username: String!
    displayName: String
    bio: String
    email: String
    photo: String
    tweets: [Tweet]
  }

  type Tweet {
    id: ID!
    createdAt: String!
    tweet: String!
    from: User!
  }
`
