import React from "react";
import EventCard from "./EventCard";
import "./EventList.css";

const EventList = ({ events }) => {
  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
