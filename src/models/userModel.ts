import mongoose from 'mongoose';

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
  joinedTime: { type: Date, required: true },
});

export const User = mongoose.model('User', userModel);
