import { Server as SocketServer } from "socket.io";
import { decodeNmea } from "./nmea-decoder";
import { createTcpListener } from "./tcp-listener";

// Day 3-এ uncomment করবে:
// import { saveVessel } from './save-vessel';

export function startAisFeed(io: SocketServer): void {
  // console.log("Starting AIS feed processor...");

  createTcpListener(
    async (line: string) => {
      const decoded = decodeNmea(line);
      if (!decoded) return;

      // Day 3: await saveVessel(decoded);

      console.log(
        `[${decoded.mmsi}] ${decoded.name} | lat:${decoded.lat.toFixed(4)} lon:${decoded.lon.toFixed(4)} | speed:${decoded.speed}kn | course:${decoded.course}° | heading:${decoded.heading}° | vesselType:${decoded.vesselType}`,
      );

      // Frontend- real-time push
      io.emit("vessel:update", decoded);
    },
    (err: Error) => {
      console.error("AIS feed error:", err.message);
    },
  );
}
