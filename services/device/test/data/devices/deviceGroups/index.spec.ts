import {DeviceGroupRepository} from "../../../../src/database/repositories/device/deviceGroup";
import device_group from "./device_group.spec";
import device_group_cyclic_1 from "./device_group_cyclic_1.spec";
import device_group_cyclic_2 from "./device_group_cyclic_2.spec";
import device_group_nested from "./device_group_nested.spec";
import {EntityData} from "@crosslab/service-common/test-helper";

export const deviceGroupNames = [
  "device group",
  "nested device group",
  "cyclic device group 1",
  "cyclic device group 2",
] as const;
export type DeviceGroupName = (typeof deviceGroupNames)[number];
export type DeviceGroupData = Record<DeviceGroupName, EntityData<DeviceGroupRepository>>;

device_group_cyclic_1.request.devices.push({url: device_group_cyclic_2.response.url});
device_group_cyclic_1.model.devices.push({url: device_group_cyclic_2.response.url});
device_group_cyclic_1.response.devices.push({url: device_group_cyclic_2.response.url});

device_group_cyclic_2.request.devices.push({url: device_group_cyclic_1.response.url});
device_group_cyclic_2.model.devices.push({url: device_group_cyclic_1.response.url});
device_group_cyclic_2.response.devices.push({url: device_group_cyclic_1.response.url});

export const deviceGroupData: DeviceGroupData = {
  "device group": {...device_group},
  "nested device group": {...device_group_nested},
  "cyclic device group 1": {...device_group_cyclic_1},
  "cyclic device group 2": {...device_group_cyclic_2},
};
