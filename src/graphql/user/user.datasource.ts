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
}

export default UserAPI;
