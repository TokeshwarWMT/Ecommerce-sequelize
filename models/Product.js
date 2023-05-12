import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    adminId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    images: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      get() {
        const images = this.getDataValue("images");
        return images ? images.split(",") : [];
      },
      set(value) {
        this.setDataValue("images", value.join(","));
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "You must enter a title" },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specifications: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    material_care: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const size = this.getDataValue("size");
        return size ? size.split(",") : [];
      },
      set(value) {
        this.setDataValue("size", value.join(","));
      },
    },
    offers: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const offers = this.getDataValue("offers");
        return offers ? offers.split(",") : [];
      },
      set(value) {
        this.setDataValue("offers", value.join(","));
      },
    },
  },
  {
    timestamps: false,
    initialAutoIncrement: 1001,
  }
);

export default Product;
