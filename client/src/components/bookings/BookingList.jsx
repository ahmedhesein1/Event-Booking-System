import React from "react";
import BookingCard from "./BookingCard";
import "./BookingList.css";

const BookingList = ({ bookings, onCancel }) => {
  return (
    <div className="bookings-list">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default BookingList;
