import axios from "axios";
import { Vessel } from "../features/vessel-map/types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchAllVessels(): Promise<Vessel[]> {
  const response = await apiClient.get<Vessel[]>("/api/vessels");
  return response.data;
}
