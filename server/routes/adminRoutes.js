import express from "express";
import * as userController from "../controllers/userController.js";
import * as eventController from "../controllers/eventController.js";
import * as authController from "../controllers/authController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Admin-only routes
router.use(authenticate, authorizeAdmin);
router.post("/", eventController.createEvent);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

router.get("/users-with-bookings", userController.getAllUsersWithBookings);

router.get("/events-with-bookings", eventController.getEventsWithBookingCounts);

router.patch("/:id", authController.makeAdmin);

router.delete("/users/:id", userController.deleteUser);

export default router;
