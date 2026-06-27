# 🚢 AIS Vessel Tracker

Real-time vessel tracking web application that displays AIS vessel positions on an interactive map.

## Tech Stack

- **Frontend:** React.js + TypeScript + Leaflet.js
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB Atlas
- **Real-time:** Socket.io
- **Architecture:** Vertical Slice Architecture (One Folder Per Use Case)

## Project Structure

```
ais-vessel-tracker/
├── backend/      # Node.js + Express + TypeScript
├── frontend/     # React + TypeScript + Leaflet
└── docs/         # Architecture document
```

## Setup & Installation

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### Backend

```bash
cd backend
npm install
cp .env.example .env
# .env file-এ MONGODB_URI দাও
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## How to Connect AIS Feed

`.env` file-এ:

```
AIS_HOST=ais.portvision.com
AIS_PORT=56824
```

Backend চালু হলে automatically TCP feed-এ connect হবে।

## Architecture

See [docs/architecture.md](./docs/architecture.md)

---
