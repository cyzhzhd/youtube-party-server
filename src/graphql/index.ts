import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { dataSources } from './datasources';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { JWT } from '../type/type';

async function context(req) {
  const authHeader = req.req.headers?.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) return { userDoc: null };
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JWT;
  const userDoc = await User.findById(user._id).select('_id uid nickName joinedTime bookmarkedParties friendList');
  return { userDoc };
}
const server = new ApolloServer({
  schema,
  dataSources,
  context,
});

export default server;
