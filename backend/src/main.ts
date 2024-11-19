// Import des routes
import authRoutes from './routes/auth.routes';
import formulaRoutes from './routes/formula.routes';
import tutorialRoutes from './routes/tutorial.routes';
// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Configuration CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost'], // Ajoutez tous vos origins autorisés
  credentials: true, // Si vous utilisez des cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Autres middleware
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/formulas', formulaRoutes);
app.use('/api/tutorials', tutorialRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.port || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;