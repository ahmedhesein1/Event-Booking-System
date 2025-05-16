import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "express-async-errors";
import path from "path";
// Import routes
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Middlewares
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.use(cookieParser());

// ======================================
//         Middleware Configuration
// ======================================

// 1. CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

// 2. Request Logger (Development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3. Body Parsers
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For URL-encoded bodies
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Serve uploads directory

// ======================================
//              Routes
// ======================================

// Authentication Routes
app.use("/api/v1/auth", authRoutes);

// Event Routes (Protected + Admin)
app.use("/api/v1/events", eventRoutes);

// Booking Routes (Protected)
app.use("/api/v1/bookings", bookingRoutes);

// Admin Only Routes
app.use("/api/v1/admin", adminRoutes);

// ======================================
//          Error Handling
// ======================================
app.use(errorHandler); // Must be last middleware

export default app;
