/**
 * AIS TCP Feed Test Script
 * Run: npx ts-node src/test-feed.ts
 * and ensure that the AIS feed is working and sending NMEA data.
 */
import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(__dirname, "../.env") });

import net from "net";

const HOST = process.env.AIS_HOST;
const PORT = parseInt(process.env.AIS_PORT || "56824");

console.log(`Connecting to AIS feed at ${HOST}:${PORT}...`);

const client = net.createConnection({ host: HOST, port: PORT });

client.on("connect", () => {
  console.log("Connected to AIS feed!");
  console.log("Waiting for NMEA data...\n");
});

let messageCount = 0;

client.on("data", (data: Buffer) => {
  const lines = data.toString().trim().split("\n");

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("!AIVDM") || trimmed.startsWith("!AIVDO")) {
      messageCount++;
      console.log(`[${messageCount}] ${trimmed}`);

      if (messageCount >= 5) {
        console.log("\nFeed is working! Raw NMEA data received.");
        client.destroy();
        process.exit(0);
      }
    }
  });
});

client.on("error", (err: Error) => {
  console.error("Connection error:", err.message);
  console.log("\nFeed unavailable? Test with Sample NMEA:");
  console.log("!AIVDM,1,1,,B,15M67N0000G?Ue6E`JD0fWkN0<0j,0*5C");
  process.exit(1);
});

setTimeout(() => {
  console.log(
    "Timeout: No NMEA data received within 10 seconds. Feed may be unavailable.",
  );
  client.destroy();
  process.exit(1);
}, 10000);
