import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

export const Wishlist = sequelize.define(
  "wishlist",
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
    },
    productId: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      get() {
        const productId = this.getDataValue("productId");
        return productId ? productId.split(",") : [];
      },
      set(value) {
        this.setDataValue("productId", value.join(","));
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Wishlist;
