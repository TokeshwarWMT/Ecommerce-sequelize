import { Admin } from "../models/Admin.js";
import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

export async function createProduct(req, res) {
  try {
    let images = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path);
      images.push(result.secure_url);
    }
    let product = new Product(
      {
        adminId: req.body.adminId,
        images: images,
        title: req.body.title,
        category: req.body.category,
        ratings: req.body.ratings,
        specifications: req.body.specifications,
        price: req.body.price,
        originalPrice: req.body.originalPrice,
        description: req.body.description,
        brand: req.body.brand,
        material_care: req.body.material_care,
        size: req.body.size.split(","),
        offers: req.body.offers.split(","),
      },
      {
        fields: [
          "adminId",
          "images",
          "title",
          "category",
          "ratings",
          "specifications",
          "price",
          "originalPrice",
          "description",
          "brand",
          "material_care",
          "size",
          "offers",
        ],
      }
    );
    // res.send(product);
    // console.log(product);
    product = await product.save();
    return res.json(product);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
}

export async function getProductDetails(req, res) {
  const { id } = req.params;
  const adminId = req.admin.id;
  try {
    const admin = await Admin.findByPk(adminId);
    if (admin) {
      const product = await Product.findOne({
        where: { id: id },
      });
      return res.status(200).json(product);
    } else {
      return res.status(403).json("Unauthorized access!");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll({
      attributes: { include: ["adminId"] },
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function updateProduct(req, res) {
  try {
    const productId = req.params.id;

    let product = await Product.findOne({ where: { id: productId } });

    let newImages = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const result = await cloudinary.uploader.upload(req.files[i].path);
        newImages.push(result.secure_url);
      }
    }

    product.adminId = req.body.adminId || product.adminId;
    product.images = newImages.length > 0 ? newImages : product.images;
    product.title = req.body.title || product.title;
    product.category = req.body.category || product.category;
    product.ratings = req.body.ratings || product.ratings;
    product.specifications = {
      ...product.specifications,
      ...req.body.specifications,
    };
    product.price = req.body.price || product.price;
    product.originalPrice = req.body.originalPrice || product.originalPrice;
    product.description = req.body.description || product.description;
    product.brand = req.body.brand || product.brand;
    product.material_care = req.body.material_care || product.material_care;
    product.size = req.body.size ? req.body.size.split(",") : product.size;
    product.offers = req.body.offers
      ? req.body.offers.split(",")
      : product.offers;

    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function getAllProduct(req, res) {
  try {
    const { id, limit, minPrice, maxPrice, title, ratings, ram } = req.query;

    let whereClause = {};

    if (id) {
      whereClause.id = id;
    }

    if (minPrice) {
      whereClause.price = { [Op.gte]: minPrice };
    }

    if (maxPrice) {
      whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };
    }

    if (title) {
      const titleValues = title.split(",");
      whereClause[Op.and] = [
        ...(whereClause[Op.and] || []),
        {
          [Op.or]: titleValues.map((value) => ({
            title: { [Op.like]: `%${value}%` },
          })),
        },
      ];
    }

    if (ratings) {
      const ratingsValues = ratings.split(",");
      whereClause[Op.and] = [
        ...(whereClause[Op.and] || []),
        {
          [Op.or]: ratingsValues.map((value) => ({
            ratings: { [Op.like]: `%${value}%` },
          })),
        },
      ];
    }

    if (ram) {
      const ramValues = ram.split(",");
      whereClause[Op.and] = [
        ...(whereClause[Op.and] || []),
        {
          [Op.or]: ramValues.map((value) =>
            sequelize.literal(
              `JSON_EXTRACT(specifications, '$.ram') LIKE '%${value}%'`
            )
          ),
        },
      ];
    }
    let products;

    products = await Product.findAll({ where: whereClause });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
}
