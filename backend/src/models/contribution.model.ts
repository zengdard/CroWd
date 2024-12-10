import { Schema, model } from 'mongoose';

const contributionSchema = new Schema({
  user_idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project_idProject: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

export const Contribution = model('Contribution', contributionSchema); 