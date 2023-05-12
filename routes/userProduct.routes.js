import { Router } from "express";
const router = Router();
import { getProductDetails } from "../controllers/userProduct.controller.js";

import { authentication } from "../middleware/auth.js";

router.get("/getProductDetails/:id", authentication, getProductDetails);

export default router;
