import express from "express";
import * as eventController from "../controllers/eventController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
import  upload  from "../middlewares/multer.js";
const router = express.Router();

// Public route
router.get("/", authenticate, eventController.getEvents);
router.get("/:id", authenticate, eventController.getEventById);

// Admin-only routes
router.use(authenticate, authorizeAdmin);
router.post("/", upload.single("image"), eventController.createEvent);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
