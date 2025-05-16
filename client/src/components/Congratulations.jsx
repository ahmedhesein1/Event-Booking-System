import React from "react";
import { Link } from "react-router-dom";

const Congratulations = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-primary mb-4">Congratulations!</h1>
      <p className="text-gray mb-6">You have successfully booked your event.</p>
      <Link
        to="/"
        className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Congratulations;
