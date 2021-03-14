import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { dataSources } from './datasources';

const server = new ApolloServer({
  schema,
  dataSources,
});

export default server;
