import mongoose from "mongoose";

const { Schema } = mongoose;
const { Types: { ObjectId }} = Schema;

const partyModel = new Schema({
  id: {type: ObjectId},
  name: {type: String, required: true},
  description: {type: String, default: "everyone is very welcome"},
  hostId: {type: ObjectId, required: true},
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  
  videos: [{type: String}],
  userList: [{
    uid: { type: ObjectId, required: true },
    socket: { type: String, required: true },
    name: { type: String, required: true },
  }],
  chats: [{type: ObjectId}],
})

export const Party = mongoose.model('Party', partyModel);