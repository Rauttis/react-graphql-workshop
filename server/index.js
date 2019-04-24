const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const userDb = require('./db/users')
const tweetDb = require('./db/tweets')
const typeDefs = require('./schema')

// (obj, args, context, info) => result
const resolvers = {
  Query: {
    user: (_, {username}) => userDb.getUserByUsername(username),
    users: () => userDb.getAllUsers(),
    tweet: (_, {id}) => tweetDb.getTweetById(id),
    tweets: () => tweetDb.getAllTweets(),
    me: (_, __, {user}) => userDb.getUserByUsername(user)
  },
  Mutation: {
    createUser: (_, args) => userDb.createUser(args),
    updateUser: (_, args) => userDb.updateUser(args),
    deleteUser: (_, {id}) => userDb.deleteUser({id}),
    createTweet: (_, {tweet, from}) => tweetDb.createTweet({tweet, from}),
    deleteTweet: (_, {id}) => tweetDb.deleteTweet({id})
  },
  User: {
    tweets: ({username}) => tweetDb.getTweetsFrom(username),
    email: ({username, email}, _, {user}) => user === username ? email : null
  },
  Tweet: {
    from: ({from}) => userDb.getUserByUsername(from)
  }
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({req}) => {
    const {authorization = ''} = req.headers
    const token = authorization.split(' ')[1]
    if (!token) return null
    const {user} = jwt.verify(token, 'whateversecret')
    return {user}
  }
})

server.listen().then(server => console.log(`Server started at ${server.url}`))
