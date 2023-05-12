import { Product } from "../models/Product.js";

export async function getProductDetails(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id: id },
      attributes: { exclude: ["adminId"] },
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
}
