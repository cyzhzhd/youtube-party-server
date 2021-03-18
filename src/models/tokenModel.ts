import mongoose from 'mongoose';

const { Schema } = mongoose;

export const tokenModel = new Schema({
  tokenId: { type: String, required: true },
});

export const Token = mongoose.model('Token', tokenModel);
