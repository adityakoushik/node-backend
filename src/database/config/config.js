require("dotenv").config();

const sharedConfig = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || null,
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  dialect: "mysql",
  logging: process.env.DB_LOG_SQL === "true" ? console.log : false,
};

module.exports = {
  development: {
    ...sharedConfig,
    database: process.env.DB_NAME || "node_backend_dev",
  },
  test: {
    ...sharedConfig,
    database: process.env.DB_NAME_TEST || "node_backend_test",
  },
  production: {
    ...sharedConfig,
    database: process.env.DB_NAME || "node_backend_prod",
  },
};
