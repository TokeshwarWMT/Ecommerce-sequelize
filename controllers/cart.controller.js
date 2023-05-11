import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

export async function addProductToCart(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({
        userId,
        totalPrice: 0,
        totalItems: 0,
        productId: [],
      });
    }
    cart.update({ productId: [...cart.productId, productId] });
    cart.totalPrice += product.price;
    cart.totalItems++;
    await cart.save();
    return res.json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getCart(req, res) {
  try {
    const { id } = req.params;
    const cart = (
      await Cart.findOne({
        where: { id: id },
      })
    ).get({ plain: true });
    cart.products = [];
    const productIds = cart.productId;
    for (let i = 0; i < productIds.length; i++) {
      const product = await Product.findByPk(productIds[i]);
      cart.products.push(product);
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function removeProductFromCart(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    let cartProduct = cart.productId;
    if (cartProduct.find((product) => product === productId.toString())) {
      const index = cartProduct.indexOf(productId.toString());
      if (index > -1) {
        cartProduct.splice(index, 1);
      }
      cart.update({ productId: cartProduct });
      cart.totalPrice -= product.price;
      cart.totalItems--;
      await cart.save();
    } else {
      return res.status(404).json("Product not found!");
    }
    return res.json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteCart(req, res) {
  try {
    const { id } = req.params;
    const cart = await Cart.destroy({ where: { id: id } });
    if (!cart) {
      return res.status(400).json("Cart already deleted!");
    } else {
      return res.status(200).json("Cart deleted successfully!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
