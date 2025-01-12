// controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { generateTOTP, verifyTOTP } from '../utils/totp';
import { sendVerificationEmail } from '../utils/email';
import { ApiError } from '../utils/ApiError';
import { config } from '../config/config';
import fs from 'fs/promises';
import path from 'path';
import { UserRepository } from '../services/database.service';
import { Not } from 'typeorm';

export const authController = {
  // Inscription
  register: async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const userData = req.body;
      const existingUser = await UserRepository.findOne({ 
        where: [
          { email: userData.email },
          { username: userData.username }
        ]
      });
      
      if (existingUser) {
        throw new ApiError(400, 'Email ou nom d\'utilisateur déjà utilisé');
      }

      const verificationToken = Math.random().toString(36).substring(2);
      const user = UserRepository.create({
        ...userData,
        verification_token: verificationToken
      });
      await UserRepository.save(user);

      if (userData.email) {
        await sendVerificationEmail(userData.email, verificationToken);
      }

      return res.status(201).json({
        message: 'Inscription réussie. Veuillez vérifier votre email.'
      });
    } catch (error) {
      next(error);
      return;
    }
  },

  // Connexion
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, totpCode } = req.body;

      // Trouver l'utilisateur
      const user = await UserRepository.findOne({ where: { email } });
      if (!user) {
        throw new ApiError(401, 'Email ou mot de passe incorrect');
      }

      // Vérifier le mot de passe
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new ApiError(401, 'Email ou mot de passe incorrect');
      }

      // Vérifier la 2FA si activée
      if (user.two_factor_enabled) {
        if (!totpCode) {
          return res.status(200).json({
            requiresTOTP: true
          });
        }

        if (user.two_factor_enabled && user.two_factor_secret) {
          const isValidTOTP = verifyTOTP(user.two_factor_secret, totpCode || '');
          if (!isValidTOTP) {
            throw new ApiError(401, 'Code 2FA invalide');
          }
        }
      }

      // Mettre à jour la dernière connexion
      user.last_login = new Date();
      await UserRepository.save(user);

      // Générer le token JWT
      const token = jwt.sign(
        { id: user.id }, // Changed from _id to id
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      return res.json({
        token,
        user: {
          id: user.id, // Changed from _id to id
          username: user.username,
          email: user.email
          // Removed role as it's not in the User model
        }
      });
    } catch (error) {
      next(error);
      return;
    }
  },

  // Activer la 2FA
  enable2FA: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserRepository.findOne({ where: { id: req.user?.id } });
      if (!user) {
        throw new ApiError(404, 'Utilisateur non trouvé');
      }

      const secret = await generateTOTP();
      user.two_factor_secret = secret.base32;
      user.two_factor_enabled = true;
      await UserRepository.save(user);

      res.json({
        secret: secret.base32,
        qrCode: secret.qrCode
      });
    } catch (error) {
      next(error);
    }
  },

  // Mettre à jour le profil
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.body;
      const user = await UserRepository.findOne({ where: { id: req.user.id } });
      
      if (!user) {
        throw new ApiError(404, 'Utilisateur non trouvé');
      }

      if (username) {
        const existingUser = await UserRepository.findOne({ 
          where: { 
            username,
            id: Not(user.id)
          }
        });
        if (existingUser) {
          throw new ApiError(400, 'Ce nom d\'utilisateur est déjà pris');
        }
        user.username = username;
      }

      user.updated_at = new Date();
      await UserRepository.save(user);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  // Mettre à jour l'image de profil
  updateProfileImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new ApiError(400, 'Aucune image fournie');
      }

      const user = await UserRepository.findOne({ where: { id: req.user?.id } });
      if (!user) {
        throw new ApiError(404, 'Utilisateur non trouvé');
      }

      if (user.profile_image) {
        await fs.unlink(path.join(__dirname, '../../uploads/profiles/', user.profile_image));
      }

      user.profile_image = req.file.filename;
      await UserRepository.save(user);

      res.json({
        message: 'Image de profil mise à jour',
        profileImage: `/uploads/profiles/${req.file.filename}`
      });
    } catch (error) {
      next(error);
    }
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const user = await UserRepository.findOne({ where: { email } });
      
      if (!user) {
        throw new ApiError(404, 'Utilisateur non trouvé');
      }

      // Générer un token de réinitialisation
      const resetToken = Math.random().toString(36).substring(2);
      user.reset_password_token = resetToken;
      user.reset_password_expires = new Date(Date.now() + 3600000); // 1 heure
      await UserRepository.save(user);

      // Envoyer l'email
      // TODO: Implémenter l'envoi d'email de réinitialisation

      res.json({ message: 'Instructions envoyées par email' });
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, password } = req.body;
      const now = new Date();
      const user = await UserRepository.findOne({
        where: {
          reset_password_token: token,
          reset_password_expires: Not(now)
        }
      });

      if (!user) {
        throw new ApiError(400, 'Token invalide ou expiré');
      }

      user.password = password;
      user.reset_password_token = null;
      user.reset_password_expires = null;
      await UserRepository.save(user);

      res.json({ message: 'Mot de passe mis à jour' });
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.params;
      const user = await UserRepository.findOne({ where: { verification_token: token } });

      if (!user) {
        throw new ApiError(400, 'Token de vérification invalide');
      }

      user.is_verified = true;
      user.verification_token = undefined;
      await UserRepository.save(user);

      res.json({ message: 'Email vérifié avec succès' });
    } catch (error) {
      next(error);
    }
  },

  getCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserRepository.findOne({ 
        where: { id: req.user?.id },
        select: { password: false }
      });
      if (!user) {
        throw new ApiError(404, 'Utilisateur non trouvé');
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await UserRepository.findOne({ where: { id: req.user?.id } });

      if (!user) {
        throw new ApiError(404, 'Utilisateur non trouvé');
      }

      const isValid = await user.comparePassword(currentPassword);
      if (!isValid) {
        throw new ApiError(400, 'Mot de passe actuel incorrect');
      }

      user.password = newPassword; // Changed from password_hash to password
      await UserRepository.save(user);

      res.json({ message: 'Mot de passe mis à jour' });
    } catch (error) {
      next(error);
    }
  },

  verify2FA: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { totpCode } = req.body;
      const user = await UserRepository.findOne({ where: { id: req.user?.id } });

      if (!user || !user.two_factor_secret) {
        throw new ApiError(400, '2FA non configuré');
      }

      const isValid = verifyTOTP(user.two_factor_secret, totpCode);
      if (!isValid) {
        throw new ApiError(400, 'Code invalide');
      }

      res.json({ message: 'Code 2FA vérifié' });
    } catch (error) {
      next(error);
    }
  },

  disable2FA: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserRepository.findOne({ where: { id: req.user?.id } });
      if (!user) {
        throw new ApiError(404, 'Utilisateur non trouvé');
      }

      user.two_factor_enabled = false;
      user.two_factor_secret = undefined;
      await UserRepository.save(user);

      res.json({ message: '2FA désactivé' });
    } catch (error) {
      next(error);
    }
  },

  logout: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('token');
      res.json({ message: 'Déconnecté avec succès' });
    } catch (error) {
      next(error);
    }
  }
};