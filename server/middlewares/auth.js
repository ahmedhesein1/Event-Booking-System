import "express-async-errors";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new ApiError(401, "Authentication failed!"));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) return next(new ApiError(401, "Invalid or expired token!"));
  req.user = user;
  next();
};
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ApiError(403, "Admin privileges required"));
  }
  next();
};
