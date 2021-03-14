import { makeExecutableSchema, mergeTypeDefs, mergeResolvers } from 'graphql-tools';
import PartySchema from './party/party.graphql';
import PartyResolver from './party/party.resolver';

const typeArray = [PartySchema];
export const typeDefs = mergeTypeDefs(typeArray);

const resolverArray = [PartyResolver];
export const resolvers = mergeResolvers(resolverArray);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
