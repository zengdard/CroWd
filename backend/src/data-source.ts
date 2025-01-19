import { DataSource } from "typeorm"
import { config } from "./config/config"
import { Project } from "./entities/project.entity"

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: true,
    entities: [Project],
    migrations: [],
    subscribers: [],
    extra: {
        connectionLimit: 10,
        connectTimeout: 20000
    }
})
