export interface Vessel {
  mmsi: number;
  name: string;
  lat: number;
  lon: number;
  speed: number;
  course: number;
  heading: number;
  vesselType: number;
  updatedAt?: string;
}
