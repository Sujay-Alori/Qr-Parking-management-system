# Parking Management Frontend

React.js frontend application with Tailwind CSS and shadcn/ui components for the QR-Based Parking Management System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Tech Stack

- **React.js** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Axios** - HTTP client for API calls
- **qrcode.react** - QR code display component

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   └── ...
│   ├── Auth.jsx      # Authentication component
│   ├── UserDashboard.jsx
│   ├── AdminDashboard.jsx
│   └── ...
├── services/        # API service functions
│   └── api.js       # Axios API client
├── lib/             # Utility functions
│   └── utils.js     # cn() helper for Tailwind
├── App.jsx          # Main app component
└── index.js         # Entry point
```

## Components

### shadcn/ui Components Used
- **Button** - Styled button component with variants
- **Card** - Card container component
- **Input** - Form input component
- **Label** - Form label component
- **Tabs** - Tab navigation component
- **Alert** - Alert/notification component

### Custom Components
- **Auth** - Login/Signup form
- **UserDashboard** - User parking slot booking interface
- **AdminDashboard** - Admin management interface
- **ParkingSlots** - Grid of available parking slots
- **CurrentBooking** - Display current user booking with QR code
- **QRScanner** - QR code scanning interface

## Styling

The application uses Tailwind CSS for styling with a custom color scheme defined in `tailwind.config.js`. The design follows shadcn/ui's design system with:
- Consistent spacing and typography
- Responsive grid layouts
- Accessible color contrasts
- Smooth transitions and animations

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Features

- User authentication (login/signup)
- User dashboard with slot booking
- Admin dashboard with slot management
- QR code generation and scanning
- Responsive design for mobile and desktop
- Modern UI with Tailwind CSS and shadcn/ui
