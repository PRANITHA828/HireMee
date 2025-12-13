import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
     req.id = user.id;
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

export default isAuthenticated;
