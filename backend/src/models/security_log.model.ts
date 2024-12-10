import { Schema, model } from 'mongoose';

const securityLogSchema = new Schema({
  user_idUser: { type: Schema.Types.ObjectId, ref: 'User' },
  event_type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const SecurityLog = model('SecurityLog', securityLogSchema); 