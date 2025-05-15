import React, { useState } from "react";
import { formatDate } from "../utils/formatDate";
import api from "../utils/api";
import "./BookingCard.css";

const BookingCard = ({ booking, onCancel, isHistory = false }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setLoading(true);
      try {
        await api.patch(`/api/v1/bookings/${booking._id}`);
        onCancel(booking._id);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to cancel booking");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="booking-card">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="booking-info">
        <h3>{booking.event.name}</h3>
        <p>
          <strong>Date:</strong> {formatDate(booking.event.date)}
        </p>
        <p>
          <strong>Venue:</strong> {booking.event.venue}
        </p>
        <p>
          <strong>Booking Date:</strong> {formatDate(booking.bookingDate)}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status ${booking.status}`}>{booking.status}</span>
        </p>
        {booking.status === "cancelled" && booking.cancelledAt && (
          <p>
            <strong>Cancelled on:</strong> {formatDate(booking.cancelledAt)}
          </p>
        )}
      </div>
      {!isHistory && booking.status === "confirmed" && (
        <button
          className="btn btn-danger"
          onClick={handleCancel}
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Cancel Booking"}
        </button>
      )}
    </div>
  );
};

export default BookingCard;
