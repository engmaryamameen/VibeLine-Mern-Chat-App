# Real-time Chat Application

A modern full-stack chat application built with real-time messaging capabilities, user authentication, and a beautiful, customizable interface.

![Demo App](/frontend/public/screenshot-for-readme.png)

## Overview

This application provides a complete chat experience with real-time messaging, user presence indicators, profile management, and theme customization. Built with a focus on performance and user experience.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure JWT-based authentication and authorization
- **Online Status**: Live user presence indicators
- **Profile Management**: User profiles with avatar uploads via Cloudinary
- **Theme Customization**: Multiple themes with pastel as the default
- **Responsive Design**: Modern UI built with TailwindCSS and DaisyUI
- **State Management**: Efficient global state management with Zustand
- **Error Handling**: Comprehensive error handling on both client and server

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Zustand for state management
- Socket.io Client for real-time communication
- TailwindCSS + DaisyUI for styling
- Axios for API requests
- React Hot Toast for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Socket.io for WebSocket connections
- JWT for authentication
- Cloudinary for image storage
- Bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or cloud instance)
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/engmaryamameen/VibeLine-Mern-Chat-App.git
cd fullstack-chat-app
```

2. Install dependencies:
```bash
npm install
```

### Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

### Running the Application

#### Development Mode

Start the backend server:
```bash
cd backend
npm run dev
```

In a separate terminal, start the frontend:
```bash
cd frontend
npm run dev
```

#### Production Mode

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

The application will be available at `http://localhost:5001` (backend) and the frontend will run on its configured port (typically `http://localhost:5173` for Vite).

## Project Structure

```
fullstack-chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── lib/            # Utilities and configurations
│   │   └── seeds/          # Database seed files
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   ├── lib/            # Utilities and API client
│   │   └── constants/      # App constants
│   └── package.json
└── README.md
```

## License

See the [LICENSE](LICENSE) file for details.
