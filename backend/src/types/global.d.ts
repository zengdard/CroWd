import { IUser } from './models';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
      RECAPTCHA_SECRET?: string;
    }
  }
}

export {}; 