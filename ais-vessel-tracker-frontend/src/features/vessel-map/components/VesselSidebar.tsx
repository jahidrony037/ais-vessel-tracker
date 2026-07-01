import { Vessel } from "../types";

interface VesselSidebarProps {
  vessel?: Vessel;
}

const VesselSidebar = ({ vessel }: VesselSidebarProps) => {
  if (!vessel) {
    return (
      <aside className="vessel-sidebar">
        <div className="vessel-sidebar__header">
          <h2>🚢 Vessel Details</h2>
        </div>

        <div className="vessel-sidebar__empty">
          <p>No vessel selected</p>
          <span>
            Click a vessel marker on the map to view detailed information.
          </span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="vessel-sidebar">
      <div className="vessel-sidebar__header">
        <h2>🚢 Vessel Details</h2>
      </div>

      <div className="vessel-sidebar__content">
        <p>{vessel.name}</p>
      </div>
    </aside>
  );
};

export default VesselSidebar;
