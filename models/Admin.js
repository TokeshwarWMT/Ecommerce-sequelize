import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import Product from "./Product.js";

export const Admin = sequelize.define(
  "admin",
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
    mobile: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: false,
  }
);

Admin.hasMany(Product, {
  foreinkey: "adminId",
  sourceKey: "id",
});

Product.belongsTo(Admin, { foreinkey: "adminId", targetId: "id" });
