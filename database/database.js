import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "node_sequelize_api", 
  "root", 
  "password", 
  {
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    logging: false,
  }
);

export default sequelize;