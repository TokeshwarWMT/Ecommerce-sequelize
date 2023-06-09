import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Address } from "../models/Address.js";
import { Product } from "../models/Product.js";

export async function createUser(req, res) {
  try {
    let data = req.body;
    let { name, email, password } = data;

    const uniqueEmail = await User.findOne({ where: { email: email } });
    if (uniqueEmail) {
      return res.status(400).json("Please enter a unique email");
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name: name,
      email: email,
      password: encryptedPassword,
    };
    const user = await User.create(userData);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function login(req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("email and password are required!");
    }
    const user = await User.findOne({ where: { email: email } });
    const passMatch = await bcrypt.compare(password, user.password);
    if (passMatch) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.USER_SECRET_KEY
      );
      res.status(200).send({ token: token, userId: user.dataValues.id });
    } else {
      return res.status(400).send("email not found!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getUser(req, res) {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json("User not found!");
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getAddressByUserId(req, res) {
  const { userId } = req.params;
  try {
    const tasks = await Address.findOne({ where: { userId: userId } });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
}

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


