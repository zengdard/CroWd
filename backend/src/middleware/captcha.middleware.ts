import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { ApiError } from '../utils/ApiError';

export const verifyCaptcha = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const captchaToken = req.body.captchaToken;

    if (!captchaToken) {
      throw new ApiError(400, 'Captcha requis');
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captchaToken
        }
      }
    );

    if (!response.data.success) {
      throw new ApiError(400, 'Captcha invalide');
    }

    next();
  } catch (error) {
    next(error);
  }
}; 