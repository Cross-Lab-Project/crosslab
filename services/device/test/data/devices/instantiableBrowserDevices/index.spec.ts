import {InstantiableBrowserDeviceRepository} from "../../../../src/database/repositories/device/instantiableBrowserDevice";
import instantiable_browser_device from "./instantiable_browser_device.spec";
import {EntityData} from "@crosslab/service-common/test-helper";

export const instantiableBrowserDeviceNames = ["instantiable browser device"] as const;
export type InstantiableBrowserDeviceName =
  (typeof instantiableBrowserDeviceNames)[number];
export type InstantiableBrowserDeviceData = Record<
  InstantiableBrowserDeviceName,
  EntityData<InstantiableBrowserDeviceRepository>
>;

export const instantiableBrowserDeviceData: InstantiableBrowserDeviceData = {
  "instantiable browser device": {...instantiable_browser_device},
};
