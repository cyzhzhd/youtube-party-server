import { ApolloServer } from 'apollo-server-express'
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema'

import PartyAPI from './datasources/party';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    partyAPI: new PartyAPI(),
  })
})


export default server;