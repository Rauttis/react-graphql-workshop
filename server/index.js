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
  }
}

const server = new ApolloServer({ resolvers, typeDefs })

server.listen().then(server => console.log(`Server started at ${server.url}`))
