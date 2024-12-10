import mongoose from 'mongoose';
import { config } from './config';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};