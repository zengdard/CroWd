import { DataSource, DataSourceOptions } from "typeorm"
import * as Models from "../models"

const config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "your_secure_password",
  database: process.env.DB_NAME || "crowdfunding_db",
  synchronize: true,
  logging: true,
  entities: Object.values(Models),
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
}

export const AppDataSource = new DataSource(config)

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log("Database connection established")
  } catch (error) {
    console.error("Error connecting to database:", error)
    throw error
  }
}

export const UserRepository = AppDataSource.getRepository(Models.User);
export const ProjectRepository = AppDataSource.getRepository(Models.Project);
export const ContributionRepository = AppDataSource.getRepository(Models.Contribution);
export const CommentRepository = AppDataSource.getRepository(Models.Comment);
export const RewardRepository = AppDataSource.getRepository(Models.Reward);
export const SecurityLogRepository = AppDataSource.getRepository(Models.SecurityLog);
export const SessionRepository = AppDataSource.getRepository(Models.Session);
export const TransactionRepository = AppDataSource.getRepository(Models.Transaction);
// Removed SubscriptionRepository
