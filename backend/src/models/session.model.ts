import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  user_idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  jwt_token: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date, required: true }
});

export const Session = model('Session', sessionSchema); 