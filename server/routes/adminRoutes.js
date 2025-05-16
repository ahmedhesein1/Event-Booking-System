import express from "express";
import * as userController from "../controllers/userController.js";
import * as eventController from "../controllers/eventController.js";
import * as authController from "../controllers/authController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.use(authenticate, authorizeAdmin);

router.get("/users-with-bookings", userController.getAllUsersWithBookings);

router.get("/events-with-bookings", eventController.getEventsWithBookingCounts);

router.put("/users/make-admin/:id", authController.makeAdmin);

router.delete("/users/:id", userController.deleteUser);

export default router;
