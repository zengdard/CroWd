// config/config.ts
import dotenv from 'dotenv';
dotenv.config();

interface Config {
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
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
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'your_secure_password',
    database: process.env.DB_NAME || 'crowd'
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