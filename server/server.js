import "express-async-errors"; // MUST BE FIRST IMPORT
import 'dotenv/config'
import "./config/env.js";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/error.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Error Handling (Must be last middleware)
app.use(errorHandler);

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
