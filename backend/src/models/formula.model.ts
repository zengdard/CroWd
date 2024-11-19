// models/formula.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IFormula extends Document {
  title: string;
  latex: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const formulaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  latex: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default model<IFormula>('Formula', formulaSchema);