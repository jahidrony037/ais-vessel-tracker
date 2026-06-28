import { NotFoundError } from "../../shared/errors";
import { IVessel, Vessel } from "../../shared/vessel-model";

export async function getVesselByMmsi(mmsi: number): Promise<IVessel> {
  const vessel = await Vessel.findOne({ mmsi }).lean<IVessel>();

  if (!vessel) {
    throw new NotFoundError(`Vessel with MMSI ${mmsi} not found`);
  }

  return vessel;
}
