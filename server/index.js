const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')


const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({req}) => {
    if (!req) return null
    const {authorization = ''} = req.headers
    const token = authorization.split(' ')[1]
    if (!token) return null
    const {user} = jwt.verify(token, 'whateversecret')
    return {user}
  }
})

server.listen().then(server => console.log(`Server started at ${server.url}`))
