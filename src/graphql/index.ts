import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { dataSources } from './datasources';
import UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import { JWT } from './user/userType';

async function context(req) {
  const authHeader = req.req.headers?.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) return { userDoc: null };
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JWT;
  const userDoc = await UserModel.findById(user._id);
  return { userDoc };
}
const server = new ApolloServer({
  schema,
  dataSources,
  context,
});

export default server;
