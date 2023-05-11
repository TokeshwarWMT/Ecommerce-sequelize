import { Product } from "../models/Product.js";
import { Wishlist } from "../models/Wishlist.js";

export async function addProductToWishlist(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ where: { userId } });
    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId,
        productId: [],
      });
    }
    wishlist.update({ productId: [...wishlist.productId, productId] });
    await wishlist.save();
    return res.json(wishlist);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getWishlist(req, res) {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findOne({ where: { id: id } });
    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function removeProductFromWishlist(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let wishlist = await Wishlist.findOne({ where: { userId } });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found!" });
    }
    let wishlistProduct = wishlist.productId;
    if (wishlistProduct.find((product) => product === productId.toString())) {
      const index = wishlistProduct.indexOf(productId.toString());
      if (index > -1) {
        wishlistProduct.splice(index, 1);
      }
      wishlist.update({ productId: wishlistProduct });
      await wishlist.save();
    } else {
      return res.status(404).json("Product not found!");
    }
    return res.json(wishlist);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteWishlist(req, res) {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.destroy({ where: { id: id } });
    if (!wishlist) {
      return res.status(400).json("Wishlist already deleted!");
    } else {
      return res.status(200).json("Wishlist deleted successfully!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
