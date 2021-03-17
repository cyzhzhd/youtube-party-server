import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const partyModel = new Schema({
  partyName: { type: String, required: true },
  hostId: { type: String, required: true },
  startTime: { type: Date, required: true },
  currentVideo: { type: String },
  numCurrentUser: { type: Number },
  numBookmarkedUser: { type: Number },
  videos: [
    {
      vid: { type: String },
      title: { type: String },
    },
  ],
  currentUserList: [
    {
      uid: { type: ObjectId, required: true },
      user: { type: String, required: true },
    },
  ],
  bookmarkedUserList: [
    {
      uid: { type: ObjectId, required: true },
      user: { type: String, required: true },
    },
  ],
  managers: [
    {
      uid: { type: ObjectId, required: true },
      user: { type: String, required: true },
    },
  ],
});

export const Party = mongoose.model('Party', partyModel);
