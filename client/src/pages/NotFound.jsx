import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-danger mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
