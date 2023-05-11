import { Router } from "express";
const router = Router();
import {
  addProductToWishlist,
  getWishlist,
  removeProductFromWishlist,
  deleteWishlist
} from "../controllers/wishlist.controller.js";
import { authentication } from "../middleware/auth.js";

router.post("/addProductToWishlist", authentication, addProductToWishlist);
router.get("/getWishlist/:id", authentication, getWishlist);
router.put("/removeProductFromWishlist", authentication, removeProductFromWishlist);
router.delete("/deleteWishlist/:id", authentication, deleteWishlist);

export default router;
