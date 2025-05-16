import React from "react";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings, onCancel }) => {
  return (
    <div className="grid gap-4">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default BookingList;
