import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  contribution_idContribution: { type: Schema.Types.ObjectId, ref: 'Contribution', required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
  payment_method: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

export const Transaction = model('Transaction', transactionSchema); 