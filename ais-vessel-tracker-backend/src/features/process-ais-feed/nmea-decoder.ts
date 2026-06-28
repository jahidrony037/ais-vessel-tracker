import AisParser from "aisparser";
import { DecodedVessel } from "./types";

const parser = new AisParser({ checksum: false });

const VALID_PREFIXES = ["!AIVDM", "!AIVDO"];

export function decodeNmea(sentence: string): DecodedVessel | null {
  try {
    const isValid = VALID_PREFIXES.some((prefix) =>
      sentence.startsWith(prefix),
    );
    if (!isValid) return null;

    const msg = parser.parse(sentence);

    if (msg._valid !== "VALID") return null;

    if (!msg.mmsi) return null;

    if (!Number.isFinite(msg.latitude) || !Number.isFinite(msg.longitude))
      return null;

    if (msg.latitude === 0 && msg.longitude === 0) return null;

    return {
      mmsi: msg.mmsi,
      name: msg.name?.trim() || "Unknown",
      lat: msg.latitude!,
      lon: msg.longitude!,
      speed: Number.isFinite(msg.sog) ? msg.sog! : 0,
      course: Number.isFinite(msg.cog) ? msg.cog! : 0,
      heading: Number.isFinite(msg.heading) ? msg.heading! : 0,
      vesselType: msg.shipType ?? 0,
    };
  } catch {
    // Malformed sentence — silently skip
    return null;
  }
}
