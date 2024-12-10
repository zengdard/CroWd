import helmet from 'helmet';
import session from 'express-session';
import { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import { config } from '../config/config';

export const configureSecurityMiddleware = (app: Express) => {
  // Helmet pour les en-têtes de sécurité
  app.use(helmet());

  // Session configuration
  app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.session.secure,
      httpOnly: true,
      sameSite: 'lax'
    }
  }));

  // Protection contre l'injection NoSQL
  app.use(mongoSanitize());

  // En-têtes de sécurité supplémentaires
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
};