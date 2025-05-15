import React from "react";
import BookingCard from "./BookingCard";
import "./BookingList.css";

const BookingHistory = ({ bookings }) => {
  return (
    <div className="bookings-list">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} isHistory={true} />
      ))}
    </div>
  );
};

export default BookingHistory;
