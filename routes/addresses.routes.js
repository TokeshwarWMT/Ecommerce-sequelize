import { Router } from "express";
const router = Router();
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  getAddress,
} from "../controllers/address.controller.js";
import { authentication } from "../middleware/auth.js";

// Routes
router.post("/addAddress", addAddress);
router.get("/getAddress/:id", authentication, getAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);
router.get("/", getAddresses);

export default router;
