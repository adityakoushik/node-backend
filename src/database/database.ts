import { Sequelize } from 'sequelize';
import "dotenv/config";

/**
 * Below I am creating a new Sequelize instance using the environment variables defined in the .env file. 
 * This instance will be used to connect to the MySQL database.
 */

const sequelize = new Sequelize(
  process.env.DB_NAME ?? "node_backend_dev",
  process.env.DB_USER ?? "root",
  process.env.DB_PASSWORD ?? '',
  {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    /**
     * dialect is the type of database you are connecting to. In this case, it's MySQL.
     */
    dialect: 'mysql',
    /**
     * pool means the connection pool settings. 
     * It defines the maximum and minimum number of connections, 
     * the time to acquire a connection, 
     * and the time a connection can be idle before being released.
     */
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: process.env.DB_LOG_SQL === 'true' ? console.log : false,
  }
);

export default sequelize;