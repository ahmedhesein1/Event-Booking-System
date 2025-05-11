import express from "express";
import *as eventController from "../controllers/eventController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Public route
router.get("/", eventController.getEvents);

// Admin-only routes
router.use(authenticate, authorizeAdmin);
router.post("/", eventController.createEvent);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id",eventController.deleteEvent);

export default router;
