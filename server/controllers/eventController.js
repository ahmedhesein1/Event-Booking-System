import Event from "../models/Event.js";
import ApiError from "../utils/ApiError.js";

export const getEvents = async (req, res, next) => {
  const events = await Event.find().populate("createdBy", "userName");
  res.status(200).json(events);
  if (!event) next(new ApiError(404, "Events Not Found"));
};
export const createEvent = async (req, res, next) => {
  const event = await Event.create({
    ...req.Body,
    createdBy: req.user._id,
  });
  if (!req.body) next(new ApiError(400, "All fields are required"));
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
