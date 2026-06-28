/**
 * Mock AIS Feed Server
 * if Real feed unavailable the test with mock test
 *
 * Run: npx ts-node src/mock-feed.ts
 * then .env এ: AIS_HOST=localhost, AIS_PORT=9999
 */

import net from "net";

const MOCK_PORT = 9999;

const SAMPLE_SENTENCES = [
  "!AIVDM,1,1,,B,15M67N0000G?Ue6E`JD0fWkN0<0j,0*18",
  "!AIVDM,1,1,,A,133m@ogP00PD;88MD5MTDww@2D7k,0*46",
  "!AIVDM,1,1,,B,35MsUV0Oh;rjtpLu>Mq7l2bN0000,0*3A",
  "!AIVDM,1,1,,A,15Bs:V8P00G?UoRMEBeUEOwF0<09,0*69",
  "!AIVDM,1,1,,B,15NTES0P00G?mHJMEAFSCgvN00Ru,0*33",
  "!AIVDM,1,1,,A,13HOI:0P0000VOHLCnHQKwvL05Ip,0*23",
  "!AIVDM,1,1,,B,15M67N0000G?mHJMEAFSCgvR00S0,0*45",
  "!AIVDM,1,1,,A,15NTES0P00G?UoRMEBeUEOwB0<0f,0*1E",
];

const server = net.createServer((socket) => {
  console.log("Client connected to mock feed");

  let index = 0;

  const interval = setInterval(() => {
    const sentence = SAMPLE_SENTENCES[index % SAMPLE_SENTENCES.length];
    socket.write(sentence + "\n");
    console.log(` Sent: ${sentence.substring(0, 40)}...`);
    index++;
  }, 1000);

  socket.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected from mock feed");
  });

  socket.on("error", () => {
    clearInterval(interval);
  });
});

server.listen(MOCK_PORT, () => {
  console.log(`Mock AIS feed running on port ${MOCK_PORT}`);
  console.log(`.env এ এটা set করো:`);
  console.log(`AIS_HOST=localhost`);
  console.log(`AIS_PORT=${MOCK_PORT}`);
});
