const { PubSub } = require('apollo-server')
const userDb = require('./db/users')
const tweetDb = require('./db/tweets')
const pubsub = new PubSub()

// (obj, args, context, info) => result
module.exports = {
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
    createTweet: async (_, {tweet, from}) => {
      const newTweet = await tweetDb.createTweet({tweet, from})
      pubsub.publish('TWEET_ADDED', { tweetAdded: newTweet })
      return newTweet
    },
    deleteTweet: (_, {id}) => tweetDb.deleteTweet({id})
  },
  Subscription: {
    tweetAdded: {
      subscribe: () => pubsub.asyncIterator(['TWEET_ADDED']),
    },
  },
  User: {
    tweets: ({username}) => tweetDb.getTweetsFrom(username),
    email: ({username, email}, _, {user}) => user === username ? email : null
  },
  Tweet: {
    from: ({from}) => userDb.getUserByUsername(from)
  }
}
