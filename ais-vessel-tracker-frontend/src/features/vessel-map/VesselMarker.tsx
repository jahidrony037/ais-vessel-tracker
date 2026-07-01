import L from "leaflet";
import { useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { Vessel } from "./types";

interface VesselMarkerProps {
  vessel: Vessel;
  selected: boolean;
  onSelect: (mmsi: number) => void;
}

function createVesselIcon(heading: number, selected: boolean): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div class="vessel-wrapper">
        ${selected ? `<div class="vessel-pulse"></div>` : ""}
        <div
          class="vessel-icon ${selected ? "vessel-icon--selected" : ""}"
          style="transform: rotate(${heading}deg) scale(${selected ? 1.15 : 1})"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 20 20"
          >
            <polygon
              points="10,1 18,19 10,15 2,19"
              fill="${
                selected
                  ? "var(--color-vessel-selected)"
                  : "var(--color-vessel)"
              }"
              stroke="white"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

const VesselMarker = ({ vessel, selected, onSelect }: VesselMarkerProps) => {
  const position: [number, number] = [vessel.lat, vessel.lon];
  const icon = useMemo(() => {
    return createVesselIcon(vessel.heading, selected);
  }, [vessel.heading, selected]);

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: () => {
          onSelect(vessel.mmsi);
        },
      }}
    >
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
