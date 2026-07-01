import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet/hooks";

interface MapControllerProps {
  target: [number, number] | null;
}

const MapController = ({ target }: MapControllerProps) => {
  const map = useMap();
  const prevKeyRef = useRef<string>("");

  useEffect(() => {
    if (!target) return;
    const key = `${target[0]}-${target[1]}`;
    if (key === prevKeyRef.current) return;
    prevKeyRef.current = key;
    map.flyTo(target, 10, { animate: true, duration: 1.5 });
  }, [target, map]);
  return null;
};

export default MapController;
