import "express-async-errors";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  // Check if this is the first user
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? "admin" : "user";

  const user = await User.findOne({ email });
  if (user) next(new ApiError(400, "User Already exists"));

  const newUser = await User.create({ userName, email, password, role });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production, not in development
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Required for cross-origin in production
      path: "/", // Ensure cookie is available for all routes
      maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
    })
    .status(201)
    .json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
      token,
    });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    next(new ApiError(401, "Invalid credentials"));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production, not in development
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Required for cross-origin in production
      path: "/", // Ensure cookie is available for all routes
      maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
    })
    .status(200)
    .json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      token,
    });
};
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};
export const makeAdmin = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    if (user.role === "admin") {
      return next(new ApiError(400, "This person is already an admin"));
    }

    const admin = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      data: admin,
    });
};
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};
