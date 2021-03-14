import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

export const userModel = new Schema({
  uid: { type: ObjectId },
  user: { type: String, required: true },
  roomId: { type: ObjectId },
  joinedTime: { type: Date, required: true },
});
