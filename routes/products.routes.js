import { Router } from "express";
const router = Router();
import {
  getAllProduct,
  createProduct,
  updateProduct,
  getProductDetails,
} from "../controllers/product.controller.js";

import upload from "../utils/multer.js";

router.post("/createProduct", upload.array("images"), createProduct);
router.get("/getProductDetails/:id", getProductDetails);
router.get("/getAllProduct", getAllProduct);
router.put("/updateProduct/:id", updateProduct);

export default router;
