export interface VesselResponse {
  mmsi: number;
  name: string;
  lat: number;
  lon: number;
  speed: number;
  course: number;
  heading: number;
  vesselType: number;
  updatedAt: Date;
}
