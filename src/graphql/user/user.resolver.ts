import { User } from './userType';
import { SignUpProps } from './userType';

const query = {
  user: (_, __, { userDoc }) => userDoc,
  searchedUser: async (_, { nickName }: { nickName: string }, { dataSources }) => {
    try {
      if (nickName) {
        const users = await dataSources.userAPI.findUser(nickName);
        return users.map((user: User) => ({ id: user.uid, name: user.nickName }));
      }
    } catch (error) {
      console.error('error on Query searchedUser', error);
    }
  },
};

const mutation = {
  signUpUser: async (_, { id, password, nickName }: SignUpProps, { dataSources }) => {
    try {
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

  sendFriendRequest: async (_, { uid }: { uid: string }, { userDoc, dataSources }) => {
    try {
      const success = await dataSources.userAPI.saveFriendRequest(userDoc.uid, uid);

      return {
        success,
        message: success ? 'succesfully save friend request' : 'error on friend request',
      };
    } catch (error) {
      console.error('error in Mutation sendFriendRequest', error);
    }
  },
};

export default {
  Query: query,
  Mutation: mutation,
};
