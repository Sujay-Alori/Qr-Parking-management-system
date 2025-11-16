# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
6. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
7. Whitelist your IP:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP

## Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/parking-management?retryWrites=true&w=majority
```

Replace:
- `YOUR_USERNAME` with your MongoDB username
- `YOUR_PASSWORD` with your MongoDB password
- `YOUR_CLUSTER` with your cluster name

Start backend:
```bash
npm run dev
```

## Step 3: Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

## Step 4: Access the Application

1. Open http://localhost:3000
2. Login with admin credentials:
   - Email: `admin@parking.com`
   - Password: `admin123`
3. Or create a new user account

## Troubleshooting

### MongoDB Connection Issues
- Check your connection string format
- Verify your IP is whitelisted
- Ensure database user has read/write permissions
- Check if your password has special characters (may need URL encoding)

### Frontend Not Connecting to Backend
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Port Already in Use
- Change `PORT` in backend `.env`
- Update `REACT_APP_API_URL` in frontend `.env` accordingly

## Default Data

On first run, the system automatically:
- Creates admin user (admin@parking.com / admin123)
- Initializes 18 parking slots (A-01 to A-06, B-01 to B-06, C-01 to C-06)

