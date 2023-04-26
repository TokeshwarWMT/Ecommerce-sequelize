import * as jwt from "jsonwebtoken";

export async function authentication(req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).send("please input token!");
    }

    let decodeToken = jwt.verify(token, "longstring", (err, result) => {
      if (err) {
        return res.status(400).send("invalid token!");
      }
    });
    req.user = decodeToken;
    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
