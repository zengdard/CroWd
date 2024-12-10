import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  profile_image?: string;
  is_verified: boolean;
  verification_token?: string;
  reset_password_token?: string;
  reset_password_expires?: Date;
  two_factor_enabled: boolean;
  two_factor_secret?: string;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface IProject extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  creator: Types.ObjectId | IUser;
  end_date: Date;
  category: string;
  image_url?: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  backers_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface IContribution extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId | IUser;
  project: Types.ObjectId | IProject;
  amount: number;
  reward?: string;
  status: 'pending' | 'completed' | 'failed';
  transaction_id?: string;
  created_at: Date;
} 