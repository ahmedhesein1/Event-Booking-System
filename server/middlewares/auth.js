import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(401, "Authentication failed!");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
  if (!decoded) throw new ApiError(401, "Invalid or expired token!");
};
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ApiError(403, "Admin privileges required"));
  }
  next();
};
