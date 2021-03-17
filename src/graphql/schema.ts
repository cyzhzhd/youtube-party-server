import { makeExecutableSchema, mergeTypeDefs, mergeResolvers } from 'graphql-tools';
import PartySchema from './party/party.graphql';
import PartyResolver from './party/party.resolver';
import UserSchema from './user/user.graphql';
import UserResolver from './user/user.resolver';

const typeArray = [PartySchema, UserSchema];
export const typeDefs = mergeTypeDefs(typeArray);

const resolverArray = [PartyResolver, UserResolver];
export const resolvers = mergeResolvers(resolverArray);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
