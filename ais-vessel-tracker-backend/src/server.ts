import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, "../.env") });

import http from "http";
import { Server as SocketServer } from "socket.io";
import app from "./app";
import { startAisFeed } from "./features/process-ais-feed";
import { connectDB } from "./shared/db";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

async function startServer(): Promise<void> {
  await connectDB();

  const httpServer = http.createServer(app);

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

  startAisFeed(io);

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
