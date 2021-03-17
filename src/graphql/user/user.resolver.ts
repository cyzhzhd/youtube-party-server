import { SignInProps, SignUpProps } from './userType';

const query = {};

const mutation = {
  signInUser: async (_, { id, password }: SignInProps, { dataSources }) => {
    try {
      console.log(id, password);
      if (id && password) {
        return await dataSources.userAPI.signInUser({ id, password });
      }
    } catch (error) {
      console.error('error in Mutation signInUser', error);
    }
  },
  signUpUser: async (_, { id, password, nickName }: SignUpProps, { dataSources }) => {
    try {
      console.log(id, password, nickName);
      let success = false;
      let user;
      if (id && password && nickName) {
        user = await dataSources.userAPI.signUpUser({ id, password, nickName });
        if (user) success = true;
      }

      return {
        success,
        message: user ? 'successfully signUp user' : 'error on signing up user',
        user,
      };
    } catch (error) {
      console.error('error in Mutation signUpUser', error);
    }
  },
};

export default {
  Query: query,
  Mutation: mutation,
};
