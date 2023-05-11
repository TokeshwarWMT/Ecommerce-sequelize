import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { User } from "./User.js";
import Product from "./Product.js";

export const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
      get() {
        const productId = this.getDataValue("productId");
        return productId ? productId.split(",") : [];
      },
      set(value) {
        this.setDataValue("productId", value.join(","));
      },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalItems: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

export default Cart;
