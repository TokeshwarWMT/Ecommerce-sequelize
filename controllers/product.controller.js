import { Product } from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbv10f3bf",
  api_key: "474116116625175",
  api_secret: "UU-WYsG12QFKvYzA7gVo_u6ZjbI",
});

export async function createProduct(req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    let product = new Product(
      {
        image: result.secure_url,
        title: req.body.title,
        category: req.body.category,
        ratings: req.body.ratings,
        specifications: req.body.specifications,
        price: req.body.price,
        originalPrice: req.body.originalPrice,
        offers: req.body.offers.split(","),
      },
      {
        fields: [
          "image",
          "title",
          "category",
          "ratings",
          "specifications",
          "price",
          "originalPrice",
          "offers",
        ],
      }
    );
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getProductDetails(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id: id } });
    return res.status(200).json(product);
  } catch (error) {
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
    return res.status(500).json(error.message);
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, priority, description } = req.body;

    const Product = await Product.findByPk(id);
    Product.name = name;
    Product.priority = priority;
    project.description = description;
    await project.save();

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
