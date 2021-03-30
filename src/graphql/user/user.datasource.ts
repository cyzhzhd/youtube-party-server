import { RESTDataSource } from 'apollo-datasource-rest';
import bcrypt from 'bcrypt';
import { User } from '../../models/userModel';
import { SignUpProps } from './userType';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async signUpUser({ id, password, nickName }: SignUpProps) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        uid: id,
        password: hashedPassword,
        nickName,
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
      const users = await User.find({ nickName: { $regex: nickName, $options: 'i' } }).limit(10);
      return users;
    } catch (error) {
      console.error('findUser error', error);
    }
  }
}

export default UserAPI;
