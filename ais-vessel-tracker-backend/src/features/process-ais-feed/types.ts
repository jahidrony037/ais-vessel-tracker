// Decoded AIS vessel data
export interface DecodedVessel {
  mmsi: number;
  name: string;
  lat: number;
  lon: number;
  speed: number;
  course: number;
  heading: number;
  vesselType: number;
}
