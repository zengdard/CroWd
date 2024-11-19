// types/custom.d.ts
import { Request } from 'express';
import { UserAttributes } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: UserAttributes;
  user?: User;
}