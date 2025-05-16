import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import ApiError from "../utils/ApiError.js";

export const getEvents = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const events = await Event.find()
    .skip(skip)
    .limit(limit)
    .populate("createdBy", "userName");
  const total = await Event.countDocuments();
  if (!events) next(new ApiError(404, "Events Not Found"));
  res.status(200).json({
    events,
    currentPage: page,
    totalPage: Math.ceil(total / limit),
    totalEvents: total,
  });
};
export const getEventById = async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate(
    "createdBy",
    "userName"
  );
  if (!event) return next(new ApiError(404, "Event Not Found"));
  res.status(200).json(event);
};
export const createEvent = async (req, res, next) => {
  const {
    name,
    description,
    category,
    date,
    venue,
    price,
    availableSeats,
    imageUrl,
  } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";
  // If no file is uploaded but a URL is provided, use the URL
  if (!req.file && imageUrl) {
    image = imageUrl;
  }
  const event = await Event.create({
    name,
    description,
    category,
    date,
    venue,
    price,
    image,
    availableSeats: availableSeats || 100,
    createdBy: req.user._id,
  });
  if (!req.body) return next(new ApiError(400, "All fields are required"));
  res.status(201).json(event);
};
export const updateEvent = async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) next(new ApiError(404, "Event Not Found"));
  res.status(201).json(event);
};
export const deleteEvent = async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) next(new ApiError(404, "Event Not Found"));
  res.status(200).json({
    message: "Event deleted successfully",
  });
};
export const getEventsWithBookingCounts = async (req, res, next) => {
  try {
    const events = await Event.find();
    const eventBookingCounts = await Promise.all(
      events.map(async (event) => {
        const bookingCount = await Booking.countDocuments({ event: event._id });
        return { ...event.toObject(), bookingCount };
      })
    );
    const bestEvents = eventBookingCounts
      .sort((a, b) => b.bookingCount - a.bookingCount)
      .slice(0, 5); // Top 5
    res.status(200).json({ allEvents: eventBookingCounts, bestEvents });
  } catch (err) {
    next(new ApiError(500, "Failed to fetch event booking counts"));
  }
};
