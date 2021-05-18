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
});

exports.handler = server.createHandler({
  cors: {
    origin: '*', 
  },
});

module.exports = {
  customersCreate: require('./api/controlers/customers/create'),
  customersReadAll: require('./api/controlers/customers/readAll'),
  customersReadOne: require('./api/controlers/customers/readOne'),
  customersUpdate: require('./api/controlers/customers/update'),
  customersDelete: require('./api/controlers/customers/delete'),
  customerTrigger: require('./elastick/customerInsert') 
}
