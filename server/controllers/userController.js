import "express-async-errors";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const getAllUsersWithBookings = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
      return res.status(200).json([]); // Return empty array if no users
    }

    const usersWithBookings = await Promise.all(
      users.map(async (user) => {
        const bookings = await Booking.find({ user: user._id }).populate(
          "event",
          "name"
        );
        return { ...user.toObject(), bookings }; // bookings will be [] if none exist
      })
    );

    res.status(200).json(usersWithBookings);
  } catch (err) {
    next(new ApiError(500, "Failed to fetch users and bookings"));
  }
};
export const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new ApiError(404, "User Not found"));
  res.status(200).json({ message: "User Deleted Successfully!" });
};
