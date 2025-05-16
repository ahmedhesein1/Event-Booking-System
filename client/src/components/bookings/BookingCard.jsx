import React from "react";
import { formatDate } from "../../utils/formatDate";

const BookingCard = ({ booking, onCancel }) => {
  if (!booking || !booking.event) {
    return <div className="text-gray">Booking data unavailable</div>;
  }
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-primary">
        {booking.event.name}
      </h3>
      <p className="text-gray">Date: {formatDate(booking.event.date)}</p>
      <p className="text-gray">Venue: {booking.event.venue}</p>
      <p className="text-gray">
        Price: $
        {booking.event.price != null ? booking.event.price.toFixed(2) : "N/A"}
      </p>
      <p className="text-gray">Seats: {booking.seats || 'N/A'}</p>
      <button
        className="mt-2 bg-danger text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
        onClick={() => onCancel(booking._id)}
        disabled={booking.status !== "confirmed"}
      >
        Cancel
      </button>
    </div>
  );
};

export default BookingCard;
