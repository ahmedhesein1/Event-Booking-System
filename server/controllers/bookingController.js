import "express-async-errors";
import Booking from "../models/Booking.js";
import ApiError from "../utils/ApiError.js";

export const getBookings = async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.user._id,
    status: "confirmed",
  }).populate("event", "name date venue");
  if (!bookings) next(new ApiError(500, "Failed to fetch bookings"));
  res.json(bookings);
};

export const getBookingsHistory = async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.user._id,
  }).populate("event", "name date venue");
  if (!bookings) next(new ApiError(500, "Failed to fetch bookings"));
  res.json(bookings);
};

export const createBooking = async (req, res, next) => {
  const booking = await Booking.findOne({
    user: req.user._id,
    event: req.params.eventId,
  });
  if (booking) next(new ApiError(400, "Event already booked"));
  const newBooking = await Booking.create({
    user: req.user._id,
    event: req.params.eventId,
  });
  res.status(201).json(newBooking);
};

export const cancelBooking = async (req, res, next) => {
  const booking = await Booking.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    {
      status: "cancelled",
      cancelledAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!booking) next(new ApiError(404, "Booking not found"));
  res.json({ message: "Booking canceled successfully", data: booking });
};
