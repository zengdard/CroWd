// config/config.ts
export const config = {
  db: {
    name: process.env.DB_NAME || 'latex_formula',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'votre_mot_de_passe',
    host: process.env.DB_HOST || 'localhost',
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  port: process.env.PORT || 3000
};