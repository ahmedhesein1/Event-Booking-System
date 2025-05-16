import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events, bookedEvents }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {events.map((event) => {
  const isBooked = bookedEvents.has(event._id.toString());
  return (
    <EventCard
      key={event._id}
      event={event}
      isBooked={isBooked}
    />
  );
})}
    </div>
  );
};

export default EventList;
