import { RESTDataSource } from 'apollo-datasource-rest';
import bcrypt from 'bcrypt';
import { User } from '../../models/userModel';
import { SignInProps, SignUpProps, UserType } from './userType';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
  }
  async signInUser({ id, password }: SignInProps) {
    try {
      const userDoc = (await User.findOne({ uid: id })) as UserType;
      if (userDoc === null) {
        return { success: false, message: 'invalid_id' };
      } else {
        if (await bcrypt.compare(password, userDoc.password)) {
          return { success: true, message: 'success', user: userDoc };
        } else {
          return { success: false, message: 'invalid_pw' };
        }
      }
    } catch (error) {
      console.error('singInUser error', error);
    }
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
