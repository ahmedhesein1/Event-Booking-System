import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6">Welcome to Event Booking</h1>
      <div className="space-x-4">
        <Link
          to="/events"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Browse Events
        </Link>
        <Link
          to="/login"
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
