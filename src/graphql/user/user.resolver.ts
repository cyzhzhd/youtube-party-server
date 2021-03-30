import { SignUpProps } from './userType';

const query = {
  user: (_, __, { userDoc }) => userDoc,
  searchedUser: async (_, { nickName }: { nickName: string }, { dataSources }) => {
    try {
      if (nickName) {
        const users = await dataSources.userAPI.findUser(nickName);
        return users;
      }
    } catch (error) {
      console.error('error on Query searchedUser', error);
    }
  },
};

const mutation = {
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
