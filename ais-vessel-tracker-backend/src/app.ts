import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { getAllVesselsHandler } from "./features/get-all-vessels/handler";
import { getVesselByMmsiHandler } from "./features/get-vessel-by-mmsi/handler";
import { AppError } from "./shared/errors";

const app: Application = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "AIS Vessel Tracker API is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/vessels", getAllVesselsHandler);
app.get("/api/vessels/:mmsi", getVesselByMmsiHandler);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
