// models/user.model.ts
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  two_factor_enabled: boolean;
  two_factor_secret?: string;
  profile_image?: string;
  bio?: string;
  role: 'user' | 'admin';
  last_login?: Date;
  is_verified: boolean;
  verification_token?: string;
  reset_password_token?: string;
  reset_password_expires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  two_factor_enabled: { type: Boolean, default: false },
  two_factor_secret: String,
  profile_image: String,
  bio: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  last_login: Date,
  is_verified: { type: Boolean, default: false },
  verification_token: String,
  reset_password_token: String,
  reset_password_expires: Date
});

userSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password_hash')) {
    this.password_hash = await bcrypt.hash(this.password_hash, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password_hash);
};

export const User = model<IUser>('User', userSchema);