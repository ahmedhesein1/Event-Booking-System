import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event reference is required"],
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    cancelledAt: Date,
  },
  { timestamps: true }
);

bookingSchema.index(
  { cancelledAt: 1 },
  {
    expireAfterSeconds: 30 * 24 * 60 * 60 * 1000, // 30 days in seconds
    partialFilterExpression: { status: "cancelled" },
  }
);

export default mongoose.model("Booking", bookingSchema);
