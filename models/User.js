import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Address } from "./Address.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter a name" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Address, {
  foreinkey: "userId",
  sourceKey: "id",
});

Address.belongsTo(User, { foreinkey: "userId", targetId: "id" });
