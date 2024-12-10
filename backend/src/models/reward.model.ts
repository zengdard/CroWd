import { Schema, model } from 'mongoose';

const rewardSchema = new Schema({
  project_idProject: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  description: { type: String, required: true },
  amount_required: { type: Number, required: true }
});

export const Reward = model('Reward', rewardSchema); 