import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../shared/errors";
import { getVesselByMmsi } from "./get-vessel-by-mmsi";
import { MmsiParams } from "./types";

export async function getVesselByMmsiHandler(
  req: Request<MmsiParams>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const mmsi = parseInt(req.params.mmsi);
    if (isNaN(mmsi)) {
      throw new ValidationError("MMSI must be a valid number");
    }

    const vessel = await getVesselByMmsi(mmsi);
    res.status(200).json(vessel);
  } catch (err) {
    next(err);
  }
}
