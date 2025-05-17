# Event Booking System - Full Stack Project

## Frontend

### Setup Instructions
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:3000` in your browser.

### Features
- User authentication (register, login)
- Pagination
- Event listings with "Booked" label and "Book Now" button
- Event details page with booking functionality
- Admin panel for event management and user management
- Responsive UI with clean design

### AI Usage
- Used Grok 3 by xAI to debug issues like:
  - Build the entire frontend
  - Duplicate bookings
  - Authentication failures
  - Missing "Booked" labels
  - State management optimization
- Generated UI components with AI assistance

## Backend

### Setup Instructions
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following:
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key
- PORT=5000
4. Run the development server: `npm run dev`
5. The API will be available at `http://localhost:5000`

### Features
- REST API endpoints for:
- Pagination
- Authentication (register, login)
- Event management (CRUD operations)
- Booking functionality
- Role-based permissions (admin/user)
- Event categories and tags
- Duplicate booking prevention with unique index
- Data validation and error handling

### AI Usage
- Used Grok 3 by xAI to:
- Implement authentication middleware
- Fix validation errors
- Optimize database queries
- Ensure proper API responses
- Generate documentation

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT
- **State Management**: React Context API
