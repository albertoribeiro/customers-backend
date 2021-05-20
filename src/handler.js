'use strict';
const { ApolloServer, gql } = require('apollo-server-lambda');
const setupDynamoDBClient = require('./core/util/setupDynamoDB')
setupDynamoDBClient()

const CustomerFactory = require('./core/factories/customerFactory')
const schema = require('./graphql')
const isLocal = process.env.IS_LOCAL

const server = new ApolloServer({
  schema,
  context: async() => ({
    Customer: await CustomerFactory.createInstance()
  }),
  introspection: isLocal,
  playground: isLocal,
  formatError(error) {
    console.error('[Global error logger]', error)
    return error
  },
});


exports.handler = server.createHandler({
  cors: {
    origin: '*', 
  },
});

// module.exports = {
//   customersCreate: require('./api/controllers/customers/create'),
//   customersReadAll: require('./api/controllers/customers/readAll'),
//   customersReadOne: require('./api/controllers/customers/readOne'),
//   customersUpdate: require('./api/controllers/customers/update'),
//   customersDelete: require('./api/controllers/customers/delete')
// }