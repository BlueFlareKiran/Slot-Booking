# 🚌 BusGo — Bus Seat Booking App

A simple web app to book bus seats.

## Tech Stack
- React + Tailwind CSS (Frontend)
- Node.js + Express (Backend)
- PostgreSQL / NeonDB (Database)

## Live
- Frontend: https://bus-slot.netlify.app
- Backend: https://slot-booking-3724.onrender.com

## Run Locally

**Backend**
```bash
cd server
npm install
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

## Environment Variables

**server/.env**
```
DATABASE_URL=your_neondb_connection_string
PORT=5000
```

**client/.env**
```
VITE_API_URL=http://localhost:5000
```