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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
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
