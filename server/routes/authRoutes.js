import express from "express";
import *as authController from '../controllers/authController.js'
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/register",authController.register);
router.post("/login",authController.login);

// Protected route (requires authentication)
router.get("/me", authenticate,authController.getMe);
router.patch("/admin/:id", authenticate,authController.makeAdmin);

export default router;
