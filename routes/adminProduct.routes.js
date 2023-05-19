import { Router } from "express";
const router = Router();
import {
  getAllProduct,
  createProduct,
  getAllProducts,
  updateProduct,
  getProductDetails,
} from "../controllers/adminProduct.controller.js";

import upload from "../utils/multer.js";
import { adminAuthentication } from "../middleware/auth.js";

router.post("/createProduct", upload.array("images"), createProduct);
router.get("/getProductDetails/:id", adminAuthentication, getProductDetails);
router.get("/getAllProducts", adminAuthentication, getAllProducts);
router.get("/getAllProduct", getAllProduct);
router.put(
  "/updateProduct/:id",
  upload.array("images"),
  adminAuthentication,
  updateProduct
);

export default router;
