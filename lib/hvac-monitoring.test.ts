import { describe, expect, it } from "vitest";
import { devices, getDevice, sampleReference } from "./hvac-monitoring";

describe("HVAC fixed sample data", () => {
  it("H01 / V01 S01: provides one uniquely located device on each floor", () => {
    expect(devices.map(({ id, floor, room }) => ({ id, floor, room }))).toEqual([
      { id: "AC-101", floor: 1, room: "lounge" },
      { id: "AC-201", floor: 2, room: "meeting" },
      { id: "AC-301", floor: 3, room: "office" },
    ]);
    for (const device of devices) expect(getDevice(device.id)).toBe(device);
    expect(sampleReference).toBe("2026-09-15 14:00 JST");
  });

  it("H02 / S02 S03: preserves last-known running status when readings are stale", () => {
    const device = getDevice("AC-301");
    expect(device.operation).toBe("running");
    expect(device.freshness).toBe("stale");
    expect(device.lastReceivedAt).toBe("13:00");
    expect(device.indoorTemperature).toBe(27);
    expect(device.setTemperature).toBe(25);
  });

  it("H03 / D01: distinguishes a stopped device with current data from stale data", () => {
    const device = getDevice("AC-201");
    expect(device.operation).toBe("stopped");
    expect(device.freshness).toBe("current");
    expect(device.lastReceivedAt).toBe("14:00");
    expect(device.indoorTemperature).toBe(26);
    expect(device.setTemperature).toBe(26);
  });

  it("H04 / D02 S03: retains missing hourly readings without replacing them with zero", () => {
    for (const device of devices) {
      expect(device.temperatureHistory.map(({ time }) => time)).toEqual([
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
      ]);
      const received = device.temperatureHistory.filter(({ temperature }) => temperature !== null);
      expect(received.at(-1)).toEqual({ time: device.lastReceivedAt, temperature: device.indoorTemperature });
    }
    expect(getDevice("AC-301").temperatureHistory.filter(({ temperature }) => temperature === null)).toEqual([
      { time: "12:00", temperature: null },
      { time: "14:00", temperature: null },
    ]);
    expect(getDevice("AC-101").indoorTemperature).toBe(24.5);
    expect(getDevice("AC-101").setTemperature).toBe(24);
  });
});
