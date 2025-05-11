import express from "express";
import * as bookingController from "../controllers/bookingController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get("/", bookingController.getBookings);
router.post("/:eventId", bookingController.createBooking); // eventId in URL params
router.delete("/:id", bookingController.cancelBooking); // bookingId in URL params

export default router;
