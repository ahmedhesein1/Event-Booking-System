import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const EventCard = ({ event, isBooked }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm text-center">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <div className="flex items-center justify-center">
        <h3 className="text-lg font-semibold text-primary">{event.name}</h3>
        {isBooked && (
          <span className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
            Booked
          </span>
        )}
      </div>
      <p className="text-gray">Date: {formatDate(event.date)}</p>
      <p className="text-gray">Venue: {event.venue}</p>
      <p className="text-gray">Category: {event.category}</p>
      <p className="text-gray">Price: ${event.price.toFixed(2)}</p>
      <p className="text-gray">Seats: {event.availableSeats}</p>
      <Link
        to={`/events/${event._id}`}
        className="mt-2 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
