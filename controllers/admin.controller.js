import { Admin } from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function createAdmin(req, res) {
  try {
    let data = req.body;
    let { name, email, password, mobile } = data;

    const uniqueEmail = await Admin.findOne({ where: { email: email } });
    if (uniqueEmail) {
      return res.status(400).json("Please enter a unique email");
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const adminData = {
      name: name,
      email: email,
      password: encryptedPassword,
      mobile: mobile,
    };
    const admin = await Admin.create(adminData);
    return res.status(201).json(admin);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function adminLogin(req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("email and password are required!");
    }
    const admin = await Admin.findOne({ where: { email: email } });
    if (!admin) {
        return res.status(404).json("email not found!")
    }
    const passMatch = await bcrypt.compare(password, admin.password);
    if (passMatch) {
      const token = jwt.sign(
        {
          id: admin.id,
        },
        "longstring"
      );
      res.status(200).json({ token: token, adminId: admin.dataValues.id });
    } else {
      return res.status(400).json("email not found!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getAdmin(req, res) {
  const adminId = req.admin.id;
  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json("Admin not found!");
    } else {
      return res.status(200).json(admin);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}


