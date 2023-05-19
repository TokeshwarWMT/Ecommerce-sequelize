import * as jwt from "jsonwebtoken";

export async function authentication(req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).json("please input token!");
    }

    let decodeToken = jwt.verify(token, process.env.USER_SECRET_KEY);
    req.user = decodeToken;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function adminAuthentication(req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).json("please input token!");
    }

    let decodeToken = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    req.admin = decodeToken;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
}
