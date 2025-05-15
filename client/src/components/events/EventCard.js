import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-img-container">
        <img src={event.image} alt={event.name} className="event-img" />
        <span className="event-category">{event.category}</span>
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.name}</h3>
        <p className="event-date">
          <i className="fas fa-calendar"></i> {formatDate(event.date)}
        </p>
        <p className="event-venue">
          <i className="fas fa-map-marker-alt"></i> {event.venue}
        </p>
        <p className="event-price">${event.price.toFixed(2)}</p>
        <Link to={`/events/${event._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
