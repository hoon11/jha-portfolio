export type DeviceId = "AC-101" | "AC-201" | "AC-301";

export type Device = {
  readonly id: DeviceId;
  readonly floor: 1 | 2 | 3;
  readonly room: "lounge" | "meeting" | "office";
  readonly operation: "running" | "stopped";
  readonly indoorTemperature: number | null;
  readonly setTemperature: number | null;
  readonly lastReceivedAt: string | null;
  readonly freshness: "current" | "stale";
  readonly temperatureHistory: readonly {
    readonly time: string;
    readonly temperature: number | null;
  }[];
};

export const sampleReference = "2026-09-15 14:00 JST";

const deviceRegistry: Readonly<Record<DeviceId, Device>> = {
  "AC-101": {
    id: "AC-101", floor: 1, room: "lounge", operation: "running",
    indoorTemperature: 24.5, setTemperature: 24, lastReceivedAt: "14:00", freshness: "current",
    temperatureHistory: [
      { time: "06:00", temperature: 26.2 },
      { time: "07:00", temperature: 26 },
      { time: "08:00", temperature: 25.6 },
      { time: "09:00", temperature: 25.2 },
      { time: "10:00", temperature: 24.8 },
      { time: "11:00", temperature: 24.6 },
      { time: "12:00", temperature: 24.4 },
      { time: "13:00", temperature: 24.6 },
      { time: "14:00", temperature: 24.5 },
    ],
  },
  "AC-201": {
    id: "AC-201", floor: 2, room: "meeting", operation: "stopped",
    indoorTemperature: 26, setTemperature: 26, lastReceivedAt: "14:00", freshness: "current",
    temperatureHistory: [
      { time: "06:00", temperature: 24.8 },
      { time: "07:00", temperature: 24.9 },
      { time: "08:00", temperature: 25 },
      { time: "09:00", temperature: 25.2 },
      { time: "10:00", temperature: 25.4 },
      { time: "11:00", temperature: 25.5 },
      { time: "12:00", temperature: 25.7 },
      { time: "13:00", temperature: 25.8 },
      { time: "14:00", temperature: 26 },
    ],
  },
  "AC-301": {
    id: "AC-301", floor: 3, room: "office", operation: "running",
    indoorTemperature: 27, setTemperature: 25, lastReceivedAt: "13:00", freshness: "stale",
    temperatureHistory: [
      { time: "06:00", temperature: 26.2 },
      { time: "07:00", temperature: 26.4 },
      { time: "08:00", temperature: 26.5 },
      { time: "09:00", temperature: 26.6 },
      { time: "10:00", temperature: 26.8 },
      { time: "11:00", temperature: 26.9 },
      { time: "12:00", temperature: null },
      { time: "13:00", temperature: 27 },
      { time: "14:00", temperature: null },
    ],
  },
};

export const devices: readonly Device[] = Object.values(deviceRegistry);

export function getDevice(id: DeviceId): Device {
  return deviceRegistry[id];
}
