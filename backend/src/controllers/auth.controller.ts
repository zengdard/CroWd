// controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import User from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { AuthRequest } from '../types/custom';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new ApiError(400, 'Email already exists');
      }

      const user = await User.create({ email, password, name, role: 'user' });
      const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '24h' });

      res.status(201).json({
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '24h' });

      res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      if (!user) {
        throw new ApiError(401, 'User not found');
      }
      
      res.json({
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error) {
      next(error);
    }
  }

  // Ajout de la méthode refreshToken
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer ')) {
        throw new ApiError(401, 'Authentication required');
      }

      const oldToken = authHeader.split(' ')[1];
      
      try {
        const decoded = jwt.verify(oldToken, config.jwtSecret) as jwt.JwtPayload;
        const user = await User.findByPk(decoded.userId);

        if (!user) {
          throw new ApiError(401, 'User not found');
        }

        const newToken = jwt.sign(
          { userId: user.id },
          config.jwtSecret,
          { expiresIn: '24h' }
        );

        res.json({
          token: newToken,
          user: { id: user.id, email: user.email, name: user.name }
        });
      } catch (error) {
        throw new ApiError(401, 'Invalid token');
      }
    } catch (error) {
      next(error);
    }
  }

  // Ajout de la méthode logout
  static async logout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({ message: 'Successfully logged out' });
    } catch (error) {
      next(error);
    }
  }
}