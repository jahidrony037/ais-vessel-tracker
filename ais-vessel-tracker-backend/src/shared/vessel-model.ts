import mongoose, { Document, Schema } from "mongoose";

export interface IVessel extends Document {
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

const vesselSchema = new Schema<IVessel>(
  {
    mmsi: { type: Number, required: true, unique: true },
    name: { type: String, default: "Unknown" },
    lat: { type: Number, default: 0 },
    lon: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    course: { type: Number, default: 0 },
    heading: { type: Number, default: 0 },
    vesselType: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

export const Vessel = mongoose.model<IVessel>("Vessel", vesselSchema);
