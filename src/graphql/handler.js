'use strict';
const { ApolloServer, gql } = require('apollo-server-lambda');
const setupDynamoDBClient = require('../core/util/setupDynamoDB')

setupDynamoDBClient()

const CustomerFactory = require('../core/factories/customerFactory')
const schema = require('../graphql')
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


exports.graphQL =  server.createHandler({
  cors: {
    origin: '*', 
    allowedHeaders: ['Origin','X-Requested-With','Content-Type','Accept','content-type','application/json'],
    credentials: true,
    methods: ['GET','PUT','POST','DELETE','OPTIONS']
  },
});