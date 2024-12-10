import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  user_idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project_idProject: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export const Comment = model('Comment', commentSchema); 