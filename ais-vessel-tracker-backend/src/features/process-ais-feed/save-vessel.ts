import { Vessel } from "../../shared/vessel-model";
import { DecodedVessel } from "./types";

export async function saveVessel(decoded: DecodedVessel): Promise<void> {
  await Vessel.findOneAndUpdate(
    { mmsi: decoded.mmsi },
    {
      ...decoded,
      updatedAt: new Date(),
    },
    { upsert: true },
  );
}
