import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const partyModel = new Schema({
  id: { type: ObjectId },
  partyName: { type: String, required: true },
  uid: { type: String, required: true },
  startTime: { type: Date, required: true },
  currentVideo: { type: String },
  videos: [
    {
      vid: { type: String },
      title: { type: String },
    },
  ],
  userList: [
    {
      uid: { type: ObjectId, required: true },
      user: { type: String, required: true },
    },
  ],
});

export const Party = mongoose.model('Party', partyModel);
