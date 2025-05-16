import "express-async-errors";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
export const getBookings = async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.user._id,
    status: "confirmed",
  }).populate("event", "name date venue");
  if (!bookings || bookings.length === 0)
    next(new ApiError(500, "Failed to fetch bookings"));
  res.json(bookings);
};

export const getBookingsHistory = async (req, res, next) => {
  const bookings = await Booking.find({
    user: req.user._id,
  }).populate("event", "name date venue price");
  if (!bookings) next(new ApiError(500, "Failed to fetch bookings"));
  res.json(bookings);
};

export const createBooking = async (req, res, next) => {
  const { eventId } = req.params;
  // Validate eventId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return next(new ApiError(400, "Invalid event ID format"));
  }
  // Check if the event exists
  const event = await Event.findById(eventId);
  if (!event) {
    return next(new ApiError(404, "Event not found"));
  }
  // Check if the user has already booked this event
  const existingBooking = await Booking.findOne({
    user: req.user._id,
    event: eventId,
  });
  if (existingBooking) {
    return next(new ApiError(400, "Event already booked"));
  }

  // Create the new booking
  const newBooking = await Booking.create({
    user: req.user._id,
    event: eventId,
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
