// config/config.ts
import dotenv from 'dotenv';
dotenv.config();

interface Config {
  db: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  port: string | number;
  cors: {
    origin: string[];
    credentials: boolean;
  };
  session: {
    secret: string;
    secure: boolean;
  };
  recaptcha?: {
    secret: string;
  };
}

export const config: Config = {
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/crowdfunding'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h'
  },
  port: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
    credentials: true
  },
  session: {
    secret: process.env.SESSION_SECRET || 'session-secret-key',
    secure: process.env.NODE_ENV === 'production'
  },
  recaptcha: {
    secret: process.env.RECAPTCHA_SECRET || ''
  }
};