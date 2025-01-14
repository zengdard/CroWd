import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "../models/user.model"
import { Project } from "../models/project.model"
import { Contribution } from "../models/contribution.model"
import { Transaction } from "../models/transaction.model"
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

const baseConfig: MysqlConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  synchronize: true,
  logging: true, // Enable logging temporarily to debug connection issues
  entities: [User, Project, Contribution, Transaction],
  migrations: [],
  subscribers: [],
}

export const AppDataSource = new DataSource({
  ...baseConfig,
  database: process.env.DB_NAME || "crowd",
} as DataSourceOptions)

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log("Database connection established")
  } catch (error: any) {
    if (error.code === 'ER_BAD_DB_ERROR') {
      // Create a temporary connection without database
      const tempDataSource = new DataSource({
        ...baseConfig,
        database: undefined,
      } as DataSourceOptions)

      try {
        await tempDataSource.initialize()
        const dbName = process.env.DB_NAME || "crowd"
        await tempDataSource.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
        await tempDataSource.destroy()
        
        // Try connecting again with the main DataSource
        await AppDataSource.initialize()
        console.log("Database created and connected successfully")
      } catch (createError) {
        console.error("Error creating database:", createError)
        throw createError
      }
    } else {
      console.error("Error connecting to database:", error)
      throw error
    }
  }
}