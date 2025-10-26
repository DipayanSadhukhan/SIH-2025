import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized1",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // res.json(decoded);

    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized2",
    });
  }
};
