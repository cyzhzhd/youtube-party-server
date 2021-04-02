import mongoose from 'mongoose';
import { User } from '../graphql/user/userType';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

export const userModel = new Schema({
  uid: { type: String, required: true },
  nickName: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String },
  bookmarkedParties: [
    {
      partyId: { type: ObjectId },
      partyName: { type: String },
    },
  ],
  friendList: [
    {
      _id: { type: ObjectId },
      uid: { type: String, required: true },
      nickName: { type: String, required: true },
      partyName: { type: String },
    },
  ],
  notificationHistory: [
    {
      _id: { type: ObjectId },
      type: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
      content: { type: String },
      time: { type: Date, required: true },
      checked: { type: Boolean },
    },
  ],
  joinedTime: { type: Date, required: true },
});

export default mongoose.model<User>('User', userModel);
