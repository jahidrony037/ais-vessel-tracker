import L from "leaflet";
import { Marker, Tooltip } from "react-leaflet";
import { Vessel } from "./types";

interface VesselMarkerProps {
  vessel: Vessel;
}

function createVesselIcon(heading: number): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div class="vessel-icon" style="transform: rotate(${heading}deg)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <polygon
            points="10,1 18,19 10,15 2,19"
            fill="var(--color-vessel)"
            stroke="white"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}
const VesselMarker = ({ vessel }: VesselMarkerProps) => {
  const position: [number, number] = [vessel.lat, vessel.lon];
  const icon = createVesselIcon(vessel.heading);

  return (
    <Marker position={position} icon={icon}>
      <Tooltip className="vessel-tooltip" sticky={false}>
        <div className="vessel-tooltip__content">
          <p className="vessel-tooltip__name">{vessel.name}</p>
          <div className="vessel-tooltip__divider" />
          <div className="vessel-tooltip__row">
            <span className="vessel-tooltip__label">MMSI</span>
            <span className="vessel-tooltip__value">{vessel.mmsi}</span>
          </div>
          <div className="vessel-tooltip__row">
            <span className="vessel-tooltip__label">Lat</span>
            <span className="vessel-tooltip__value vessel-tooltip__value--mono">
              {vessel.lat.toFixed(4)}°
            </span>
          </div>
          <div className="vessel-tooltip__row">
            <span className="vessel-tooltip__label">Lon</span>
            <span className="vessel-tooltip__value vessel-tooltip__value--mono">
              {vessel.lon.toFixed(4)}°
            </span>
          </div>
        </div>
      </Tooltip>
    </Marker>
  );
};

export default VesselMarker;
