import net from "net";

type OnLineCallback = (line: string) => void;
type OnErrorCallback = (err: Error) => void;

const RECONNECT_DELAY_MS = 5000;

export function createTcpListener(
  onLine: OnLineCallback,
  onError: OnErrorCallback,
): void {
  const host = process.env.AIS_HOST!;
  const port = parseInt(process.env.AIS_PORT!);

  function connect(): void {
    const client = net.createConnection({ host, port });

    let buffer = "";

    client.on("connect", () => {
      console.log(`Connected to AIS feed → ${host}:${port}`);
    });

    client.on("data", (data: Buffer) => {
      buffer += data.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed) onLine(trimmed);
      });
    });

    client.on("error", (err: Error) => {
      onError(err);
    });

    client.on("close", () => {
      console.warn(
        `AIS feed disconnected — reconnecting in ${RECONNECT_DELAY_MS / 1000}s...`,
      );
      setTimeout(connect, RECONNECT_DELAY_MS);
    });
  }

  connect();
}
