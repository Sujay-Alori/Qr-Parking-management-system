# QR-Based Parking Management System

A full-stack parking management system with QR code functionality, built with React.js frontend (using Tailwind CSS and shadcn/ui) and Node.js/Express backend with MongoDB Atlas.

## Features

### User Features
- User authentication (Login/Signup)
- View available parking slots
- Book parking slots with vehicle number
- View current booking with QR code
- Cancel bookings

### Admin Features
- Admin dashboard with statistics
- View all parking slots (available/occupied)
- Release occupied slots
- Scan QR codes to verify parking
- Generate QR codes for parking slots

## Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Axios** - HTTP client
- **qrcode.react** - QR code display component

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **QRCode** - QR code generation

## Project Structure

```
miniproject/
├── backend/          # Node.js/Express backend
│   ├── config/       # Database configuration
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── middleware/  # Authentication middleware
│   └── server.js     # Entry point
├── frontend/         # React.js frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # shadcn/ui components
│   │   └── services/       # API service functions
│   └── public/
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier works)

## Installation

### 1. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parking-management?retryWrites=true&w=majority
```

4. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Default Credentials

### Admin Account
- Email: `admin@parking.com`
- Password: `admin123`

### Test User Account
You can create a new user account through the signup form.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Parking (User)
- `GET /api/parking/slots` - Get available slots
- `GET /api/parking/booking` - Get current booking
- `POST /api/parking/book` - Book a slot
- `POST /api/parking/cancel` - Cancel booking

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/slots` - Get all slots
- `POST /api/admin/release` - Release a slot
- `GET /api/admin/qr/:slotId` - Get QR code for slot
- `POST /api/admin/scan` - Scan QR code image

## Development

### Running Both Servers

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT tokens
- `MONGODB_URI` - MongoDB Atlas connection string

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Database

The application uses MongoDB Atlas for data storage. The following collections are created automatically:
- `users` - User accounts
- `parkingslots` - Parking slots

Parking slots are initialized automatically on first connection (18 slots: A-01 to A-06, B-01 to B-06, C-01 to C-06).

## License

ISC
