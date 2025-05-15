import "express-async-errors";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) next(new ApiError(400, "User Already exists"));

  const newUser = await User.create({ userName, email, password });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
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
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  }).status(200).json({
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
  const user = await User.findByIdAndUpdate(req.params.id);
  if (user.role === 'admin') return next(new ApiError(500, "this person is already admin"));
  const admin = await User.findByIdAndUpdate(
    req.params.id,
    { role: "admin" },
    { new: true }
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