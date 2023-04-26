import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Address = sequelize.define(
  "address",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    address: DataTypes.JSON,
  },
  {
    timestamps: false,
  }
);
