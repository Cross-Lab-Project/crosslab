import {ConcreteDeviceRepository} from "../../../../src/database/repositories/device/concreteDevice";
import concrete_device from "./concrete_device.spec";
import concrete_device_no_description from "./concrete_device_no_description.spec";
import {EntityData} from "@crosslab/service-common/test-helper";

export const concreteDeviceNames = [
  "concrete device",
  "concrete device (no description)",
] as const;
export type ConcreteDeviceName = (typeof concreteDeviceNames)[number];
export type ConcreteDeviceData = Record<
  ConcreteDeviceName,
  EntityData<ConcreteDeviceRepository>
>;

export const concreteDeviceData: ConcreteDeviceData = {
  "concrete device": {...concrete_device},
  "concrete device (no description)": {...concrete_device_no_description},
};
