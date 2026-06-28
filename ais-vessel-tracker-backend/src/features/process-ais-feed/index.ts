import { Server as SocketServer } from "socket.io";
import { decodeNmea } from "./nmea-decoder";
import { saveVessel } from "./save-vessel";
import { createTcpListener } from "./tcp-listener";

export function startAisFeed(io: SocketServer): void {
  // console.log("Starting AIS feed processor...");

  createTcpListener(
    async (line: string) => {
      const decoded = decodeNmea(line);
      if (!decoded) return;

      await saveVessel(decoded);
      // console.log("vessels", decoded);

      // Frontend- real-time push
      io.emit("vessel:update", decoded);
    },
    (err: Error) => {
      console.error("AIS feed error:", err.message);
    },
  );
}
