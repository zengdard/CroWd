import { Request, Response, NextFunction } from 'express';
import csrf from 'csurf';

const csrfProtection = csrf({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

export const csrfMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Bypass CSRF for non-mutation methods and specific endpoints
  if (req.method === 'GET' || 
      req.method === 'HEAD' || 
      req.method === 'OPTIONS' ||
      req.path === '/api/auth/login' ||
      req.path === '/api/auth/register') {
    next();
  } else {
    csrfProtection(req, res, next);
  }
}; 