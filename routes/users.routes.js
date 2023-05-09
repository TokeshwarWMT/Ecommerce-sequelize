import { Router } from "express";
const router = Router();

import { createUser, login } from "../controllers/user.controller.js";

// Routes
router.post("/createUser", createUser);
router.post("/login", login);
// router.get("/getUser", getUser);

export default router;
