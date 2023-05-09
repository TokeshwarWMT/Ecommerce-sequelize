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

router.post("/addAddress", addAddress);
router.get("/getAddress/:id", authentication, getAddress);
router.put("/updateAddress/:id/:userId", authentication, updateAddress);
router.delete("deleteAddress/:id/:userId", authentication, deleteAddress);
router.get("/", getAddresses);

export default router;
