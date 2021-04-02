import { RESTDataSource } from 'apollo-datasource-rest';
import bcrypt from 'bcrypt';
import UserModel from '../../models/userModel';
import { notificationType } from './userType';
import { SignUpProps } from './userType';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async signUpUser({ id, password, nickName }: SignUpProps) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await new UserModel({
        uid: id,
        password: hashedPassword,
        nickName,
        bookmarkedParties: [],
        friendList: [],
        notificationHistory: [],
        joinedTime: new Date(),
      });

      const signedUpUser = await user.save();
      console.log(signedUpUser);
      return signedUpUser;
    } catch (error) {
      console.error('singUpUser error', error);
    }
  }

  async findUser(nickName: string) {
    try {
      const users = await UserModel.find({ nickName: { $regex: nickName, $options: 'i' } }).limit(10);
      return users;
    } catch (error) {
      console.error('findUser error', error);
    }
  }

  async saveFriendRequest(requestingUserId, requestedUserId) {
    try {
      const requestingUser = await UserModel.findOne({ uid: requestingUserId });
      requestingUser.notificationHistory.push({
        type: notificationType.FRIEND_REQUEST,
        from: requestingUserId,
        to: requestedUserId,
        time: new Date(),
        checked: false,
      });
      await requestingUser.save();

      const requestedUser = await UserModel.findOne({ uid: requestedUserId });
      requestedUser.notificationHistory.push({
        type: notificationType.FRIEND_REQUEST,
        from: requestingUserId,
        to: requestedUserId,
        time: new Date(),
        checked: false,
      });
      await requestedUser.save();

      return true;
    } catch (error) {
      console.error('request Freind error', error);
    }
  }
}

export default UserAPI;
