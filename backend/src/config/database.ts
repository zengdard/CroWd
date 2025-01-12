import { DataSource } from "typeorm"
import { User, Project, Transaction, Contribution, Comment, Reward, Session, SecurityLog } from "../models"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "your_secure_password",
  database: process.env.DB_NAME || "crowdfunding_db",
  synchronize: true,
  logging: true,
  entities: [
    User,
    Project,
    Transaction,
    Contribution,
    Comment,
    Reward,
    Session,
    SecurityLog
  ],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
})

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log("Database connection established")
  } catch (error) {
    console.error("Error connecting to database:", error)
    throw error
  }
}