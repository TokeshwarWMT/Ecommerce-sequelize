import { Router } from "express";
const router = Router();

import {
  createAdmin,
  adminLogin,
  getAdmin,
} from "../controllers/admin.controller.js";
import { adminAuthentication } from "../middleware/auth.js";

// Routes
router.post("/createAdmin", createAdmin);
router.post("/adminLogin", adminLogin);
router.get("/getAdmin/me", adminAuthentication, getAdmin);

export default router;
