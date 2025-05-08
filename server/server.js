// server.js
import "dotenv/config";
import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

// Database connection and server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
});
