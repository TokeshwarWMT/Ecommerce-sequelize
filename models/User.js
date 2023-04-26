import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Product } from "./Product.js";
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
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Product, {
  foreinkey: "userId",
  sourceKey: "id",
});
User.hasMany(Address, {
  foreinkey: "userId",
  sourceKey: "id",
});
Product.belongsTo(User, { foreinkey: "userId", targetId: "id" });
Address.belongsTo(User, { foreinkey: "userId", targetId: "id" });
