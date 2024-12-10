import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  user_idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal_amount: { type: Number, required: true },
  current_amount: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'active', 'completed', 'cancelled'], default: 'draft' }
});

export const Project = model('Project', projectSchema); 