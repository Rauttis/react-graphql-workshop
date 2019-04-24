const { ApolloServer, gql } = require('apollo-server')
const userDb = require('./db/users')
const tweetDb = require('./db/tweets')

const typeDefs = gql`
  type Query {
    user(username: String!): User
    users: [User]!
    tweet(id: ID!): Tweet
    tweets: [Tweet]!
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

// (obj, args, context, info) => result
const resolvers = {
  Query: {
    user: (_, {username}) => userDb.getUserByUsername(username),
    users: () => userDb.getAllUsers(),
    tweet: (_, {id}) => tweetDb.getTweetById(id),
    tweets: () => tweetDb.getAllTweets(),
  },
  User: {
    tweets: ({username}) => tweetDb.getTweetsFrom(username),
  },
  Mutation: {
    createUser: (_, args) => userDb.createUser(args),
    updateUser: (_, args) => userDb.updateUser(args),
    deleteUser: (_, id) => userDb.deleteUser(id),
    createTweet: (_, {tweet, from}) => tweetDb.createTweet({tweet, from}),
    deleteTweet: (_, id) => tweetDb.deleteTweet(id)
  }
}

const server = new ApolloServer({ resolvers, typeDefs })

server.listen().then(server => console.log(`Server started at ${server.url}`))
