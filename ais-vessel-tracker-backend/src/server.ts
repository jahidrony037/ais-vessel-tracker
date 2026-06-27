import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, "../.env") });

import http from "http";
import { Server as SocketServer } from "socket.io";
import app from "./app";
import { connectDB } from "./shared/db";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

async function startServer(): Promise<void> {
  // Step 1: MongoDB connect
  await connectDB();

  // Step 2: HTTP server বানাও (Express এর উপরে)
  const httpServer = http.createServer(app);

  // Step 3: Socket.io initialize করো
  const io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Step 4: AIS feed শুরু করো (Day 2-এ uncomment করবে)
  // import { startAisFeed } from './features/process-ais-feed';
  // startAisFeed(io);

  // Step 5: Server listen করো
  httpServer.listen(PORT, () => {
    console.log(`Server running → http://localhost:${PORT}`);
    console.log(`WebSocket ready`);
    console.log(`Health check → http://localhost:${PORT}/health`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
