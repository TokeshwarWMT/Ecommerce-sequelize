import { Router } from "express";
const router = Router();
import {
  addProductToCart,
  getCart,
  deleteCart,
  removeProductFromCart,
} from "../controllers/cart.controller.js";
import { authentication } from "../middleware/auth.js";

router.post("/addProductToCart", authentication, addProductToCart);
router.get("/getCart/:id", authentication, getCart);
router.put("/removeProductFromCart", authentication, removeProductFromCart);
router.delete("/deleteCart/:id", authentication, deleteCart);

export default router;
