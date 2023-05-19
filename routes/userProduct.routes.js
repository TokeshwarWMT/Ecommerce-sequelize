import { Router } from "express";
const router = Router();
import {
  getProductDetails,
  getAllProducts,
} from "../controllers/userProduct.controller.js";

import { authentication } from "../middleware/auth.js";

router.get("/getProductDetails/:id", authentication, getProductDetails);
router.get("/getAllProducts", authentication, getAllProducts);

export default router;
