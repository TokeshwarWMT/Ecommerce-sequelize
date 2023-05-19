import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { v2 as cloudinary } from "cloudinary";

const app = express();

import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/users.routes.js";
import adminProductRoutes from "./routes/adminProduct.routes.js";
import userProductRoutes from "./routes/userProduct.routes.js";
import addressRoutes from "./routes/addresses.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import withlistRoutes from "./routes/wishlist.routes.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PATCH", "OPTION"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("connection successfully!");
});

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/users/products", userProductRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/wishlists", withlistRoutes);

app.use("*", (req, res) => {
  return res.status(404).json("route not found!");
});

// app.listen(process.env.PORT);
export default app;
