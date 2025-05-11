import "express-async-errors";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) next(new ApiError(400, "User Already exists"));

  const newUser = await User.create({ userName, email, password });
  generateToken(res, newUser._id);
  res.status(201).json({
    _id: newUser._id,
    userName: newUser.userName,
    email: newUser.email,
    role: newUser.role,
  });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    next(new ApiError(401, "Invalid credentials"));
  }
  generateToken(res, user._id);
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
};
export const getMe = async (req, res) => {
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
