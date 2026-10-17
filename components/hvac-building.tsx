"use client";

import type { HvacMessages } from "../content/hvac-messages";
import { devices, type DeviceId } from "../lib/hvac-monitoring";

type Props = { selectedId: DeviceId; onSelect: (id: DeviceId) => void; copy: HvacMessages };

export default function HvacBuilding({ selectedId, onSelect, copy }: Props) {
  return <div className="hvac-building" role="group" aria-label={copy.building}>
    <div className="hvac-roof" aria-hidden="true"><span className="hvac-roof-equipment" /><span /></div>
    <div className="hvac-floors">
      {[...devices].sort((left, right) => right.floor - left.floor).map((device) => <div className="hvac-floor" key={device.id}>
        <span className="hvac-floor-label">{device.floor}F</span>
        <div className={`hvac-room hvac-room--${device.room}`}>
          <span className="hvac-room-label">{copy.rooms[device.room]}</span>
          <div className="hvac-windows" aria-hidden="true"><span className="hvac-window" /><span className="hvac-window" /><span className="hvac-window" /></div>
          <div className={`hvac-furniture hvac-furniture--${device.room}`} aria-hidden="true"><span className="hvac-desk" /><span className="hvac-chair" /><span className="hvac-plant" /></div>
          <button type="button" className={`hvac-unit hvac-unit--${device.operation}${selectedId === device.id ? " is-selected" : ""}`} aria-pressed={selectedId === device.id} aria-label={`${device.id} · ${copy.rooms[device.room]} · ${copy[device.operation]}`} onClick={() => onSelect(device.id)}>
            <span className="hvac-unit-icon" aria-hidden="true"><span /><span /><span /></span>
            <span className="hvac-unit-id">{device.id}</span><span className="hvac-unit-status">{copy[device.operation]}</span>
            {selectedId === device.id && <span className="hvac-unit-selected" aria-hidden="true">✓</span>}
          </button>
        </div>
      </div>)}
    </div>
    <div className="hvac-building-foundation" aria-hidden="true" />
  </div>;
}
