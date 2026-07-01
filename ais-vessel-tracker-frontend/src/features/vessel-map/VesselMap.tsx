import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useVesselSocket } from "../../hooks/useVesselSocket";
import { fetchAllVessels } from "../../services/api";
import VesselMarker from "./VesselMarker";
import { Vessel } from "./types";

const DEFAULT_CENTER: [number, number] = [20, 0];
const DEFAULT_ZOOM = 3;

const VesselMap = () => {
  const [vessels, setVessels] = useState<Map<number, Vessel>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMmsi, setSelectedMmsi] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedMmsi");
    if (stored) {
      setSelectedMmsi(Number(stored));
    }
  }, []);

  useEffect(() => {
    fetchAllVessels()
      .then((data) => {
        setVessels(new Map(data.map((v) => [v.mmsi, v])));
      })
      .catch(() => {
        setError(
          "Vessel Data is not loading please check the server connection",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelectVessel = useCallback((mmsi: number) => {
    setSelectedMmsi((prev) => {
      const next = prev === mmsi ? null : mmsi;
      if (next === null) {
        localStorage.removeItem("selectedMmsi");
      } else {
        localStorage.setItem("selectedMmsi", String(next));
      }
      return next;
    });
  }, []);

  const handleVesselUpdate = useCallback((vessel: Vessel) => {
    setVessels((prev) => new Map(prev).set(vessel.mmsi, vessel));
  }, []);

  useVesselSocket(handleVesselUpdate);

  const selectedVessel =
    selectedMmsi === null ? undefined : vessels.get(selectedMmsi);

  if (loading) {
    return (
      <div className="map-container map-container--centered">
        <div className="map-loader">
          <div className="map-loader__spinner" />
          <p className="map-loader__text">Loading vessels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-container map-container--centered">
        <p className="map-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="map-container">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="map-leaflet"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {Array.from(vessels.values()).map((vessel) => {
          const isSelected = selectedMmsi === vessel.mmsi;
          return (
            <VesselMarker
              key={vessel.mmsi}
              vessel={vessel}
              selected={isSelected}
              onSelect={handleSelectVessel}
            />
          );
        })}
      </MapContainer>

      <div className="map-badge">🚢 {vessels.size} vessels</div>
    </div>
  );
};

export default VesselMap;
