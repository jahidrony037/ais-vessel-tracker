import { NextFunction, Request, Response } from "express";
import { getAllVessels } from "./get-all-vessels";

export async function getAllVesselsHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const vessels = await getAllVessels();
    res.status(200).json(vessels);
  } catch (err) {
    next(err);
  }
}
