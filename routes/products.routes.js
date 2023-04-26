import { Router } from "express";
const router = Router();
import {
  getAllProduct,
  createProduct,
  updateProduct,
  getProductDetails,
  getProductByUserId,
} from "../controllers/product.controller.js";
import { authentication } from "../middleware/auth.js";

import upload from "../utils/multer.js";

router.post("/createProduct", upload.single("image"),authentication, createProduct);
router.get("/getProductDetails/:id", authentication, getProductDetails);
router.get("/getAllProduct", authentication, getAllProduct);
router.put("/updateProduct/:id", authentication, updateProduct);

router.get("/getProductByUserId/:id", authentication, getProductByUserId);

export default router;
