# Parking Management Backend API

Express.js backend server with MongoDB Atlas integration for the QR-Based Parking Management System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parking-management?retryWrites=true&w=majority
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (use `0.0.0.0/0` for development)
5. Get your connection string and add it to `.env` as `MONGODB_URI`

## API Documentation

All endpoints require authentication (except registration and login) via Bearer token in the Authorization header.

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
```

#### Verify Token
```
GET /api/auth/verify
Headers: Authorization: Bearer <token>
```

### Parking Endpoints (User)

#### Get Available Slots
```
GET /api/parking/slots
Headers: Authorization: Bearer <token>
```

#### Get Current Booking
```
GET /api/parking/booking
Headers: Authorization: Bearer <token>
```

#### Book Slot
```
POST /api/parking/book
Headers: Authorization: Bearer <token>
Body: { slotId, vehicleNumber }
```

#### Cancel Booking
```
POST /api/parking/cancel
Headers: Authorization: Bearer <token>
```

### Admin Endpoints

#### Get Statistics
```
GET /api/admin/stats
Headers: Authorization: Bearer <token>
```

#### Get All Slots
```
GET /api/admin/slots
Headers: Authorization: Bearer <token>
```

#### Release Slot
```
POST /api/admin/release
Headers: Authorization: Bearer <token>
Body: { slotId }
```

#### Get QR Code
```
GET /api/admin/qr/:slotId
Headers: Authorization: Bearer <token>
```

#### Scan QR Code
```
POST /api/admin/scan
Headers: Authorization: Bearer <token>
Body: FormData with 'image' field
```

## Database Models

### User Model
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - 'user' or 'admin'

### ParkingSlot Model
- `id` - Unique slot identifier (e.g., "A-01")
- `status` - 'available' or 'occupied'
- `vehicleNumber` - Vehicle number (if occupied)
- `bookingTime` - Booking timestamp
- `bookedBy` - Reference to User
- `qrCode` - QR code data string

## Notes

- The backend automatically initializes 18 parking slots on first connection
- Admin user is created automatically (email: admin@parking.com, password: admin123)
- JWT tokens expire after 7 days
- Passwords are hashed using bcryptjs
