import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
};

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
        "longstring"
      );
      res.status(200).send({ token: token });
    } else {
      return res.status(400).send("email not found!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
