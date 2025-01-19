import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "../models/user.model"
import { Project } from "../models/project.model"
import { Contribution } from "../models/contribution.model"
import { Transaction } from "../models/transaction.model"
import { Reward } from "../models/reward.model"
import { Comment } from "../models/comment.model"
import { Session } from "../models/session.model"
import { SecurityLog } from "../models/security_log.model"
import { Subscription } from "../models/subscription.model"

const MAX_RETRIES = 5
const RETRY_DELAY = 5000 // 5 seconds

const baseConfig: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "crowd",
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: [
    User,
    Project,
    Contribution,
    Transaction,
    Reward,
    Comment,
    Session,
    SecurityLog,
    Subscription
  ],
  migrations: [],
  subscribers: [],
  connectTimeout: 30000, // 30 seconds
  acquireTimeout: 30000,
}

export const AppDataSource = new DataSource(baseConfig)

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const tryCreateDatabase = async () => {
  const tempConfig = {
    ...baseConfig,
    database: undefined,
  }
  const tempDataSource = new DataSource(tempConfig)

  try {
    await tempDataSource.initialize()
    const dbName = process.env.DB_NAME || "crowd"
    await tempDataSource.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
    await tempDataSource.destroy()
    return true
  } catch (error) {
    console.error("Failed to create database:", error)
    return false
  }
}

const checkConnection = async (): Promise<boolean> => {
  try {
    await AppDataSource.query('SELECT 1')
    return true
  } catch {
    return false
  }
}

export const initializeDB = async () => {
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      if (AppDataSource.isInitialized) {
        const isConnected = await checkConnection()
        if (isConnected) return
        await AppDataSource.destroy()
      }

      await AppDataSource.initialize()
      
      if (await checkConnection()) {
        console.log("Database connection established successfully")
        return
      }
    } catch (error: any) {
      console.error(`Database connection attempt ${retries + 1} failed:`, error.message)
      
      if (error.code === 'ER_BAD_DB_ERROR') {
        const created = await tryCreateDatabase()
        if (created) {
          continue
        }
      }

      if (retries === MAX_RETRIES - 1) {
        throw new Error(`Failed to connect to database after ${MAX_RETRIES} attempts`)
      }

      await wait(RETRY_DELAY)
    }
    retries++
  }
}

// Health check function
export const checkDatabaseHealth = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      return false
    }
    return await checkConnection()
  } catch {
    return false
  }
}