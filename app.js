import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const app = express();

import userRoutes from "./routes/users.routes.js";
import productRoutes from "./routes/products.routes.js";
import addressRoutes from "./routes/addresses.routes.js";

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

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/addresses", addressRoutes);

app.use("*", (req, res) => {
  return res.status(404).json("route not found!");
});

export default app;
