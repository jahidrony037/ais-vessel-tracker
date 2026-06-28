import { Vessel } from "../../shared/vessel-model";
import { VesselResponse } from "./types";

export async function getAllVessels(): Promise<VesselResponse[]> {
  return await Vessel.find({}).lean<VesselResponse[]>();
}
