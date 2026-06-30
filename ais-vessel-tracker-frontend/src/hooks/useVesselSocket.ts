import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Vessel } from "../features/vessel-map/types";

const SOCKET_URL = import.meta.env.VITE_API_URL;

export function useVesselSocket(
  onVesselUpdate: (vessel: Vessel) => void,
): void {
  const callbackRef = useRef(onVesselUpdate);

  useEffect(() => {
    callbackRef.current = onVesselUpdate;
  }, [onVesselUpdate]);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      // console.log("Socket connected:", socket.id);
    });

    socket.on("vessel:update", (vessel: Vessel) => {
      callbackRef.current(vessel);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}
