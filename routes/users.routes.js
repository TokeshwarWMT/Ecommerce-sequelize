import { Router } from "express";
const router = Router();

import {
  createUser,
  login,
  getUser,
  getAddressByUserId,
  getProductDetails,
} from "../controllers/user.controller.js";
import { authentication } from "../middleware/auth.js";

// Routes
router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getUser/me", authentication, getUser);
router.get("/getAddressByUserId/:userId", getAddressByUserId);

export default router;


