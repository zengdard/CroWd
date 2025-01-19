import 'reflect-metadata';
import { Reward } from './models/reward.model';
// Import des routes

import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import contributionRoutes from './routes/contribution.routes';
import commentRoutes from './routes/comment.routes';
// backend/src/server.ts
import "reflect-metadata"
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/config';
import { initializeDB } from './config/database';
import { errorHandler } from './middleware/error.middleware';
import { configureSecurityMiddleware } from './middleware/security.middleware';
import { databaseCheckMiddleware } from './middleware/database-check.middleware';

const app = express();

// Body parsing middleware - move before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuration CORS - move this before other middleware
app.use(cors({
  origin: ['http://localhost', 'http://localhost:80'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  optionsSuccessStatus: 200
}));

// Handle preflight requests
app.options('*', cors());

// Configuration de la sécurité
configureSecurityMiddleware(app);

// Add after express initialization and before routes
app.use(databaseCheckMiddleware);

// Routes
// Support both /api prefix and direct paths for backwards compatibility
app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/api/projects', projectRoutes);
app.use('/contributions', contributionRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/comments', commentRoutes);
app.use('/api/comments', commentRoutes);

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
const startServer = async () => {
  try {
    await initializeDB();
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;