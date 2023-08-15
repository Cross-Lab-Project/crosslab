import {DeviceRepository} from "../../src/database/repositories/device";
import {ConcreteDeviceRepository} from "../../src/database/repositories/device/concreteDevice";
import {DeviceGroupRepository} from "../../src/database/repositories/device/deviceGroup";
import {InstantiableBrowserDeviceRepository} from "../../src/database/repositories/device/instantiableBrowserDevice";
import {InstantiableCloudDeviceRepository} from "../../src/database/repositories/device/instantiableCloudDevice";
import {PeerconnectionRepository} from "../../src/database/repositories/peerconnection";
import {UserData, UserType} from "../../src/generated/types";
import {
  concreteDeviceData,
  ConcreteDeviceName,
} from "./devices/concreteDevices/index.spec";
import {deviceGroupData, DeviceGroupName} from "./devices/deviceGroups/index.spec";
import {deviceData, DeviceName} from "./devices/index.spec";
import {
  instantiableBrowserDeviceData,
  InstantiableBrowserDeviceName,
} from "./devices/instantiableBrowserDevices/index.spec";
import {
  instantiableCloudDeviceData,
  InstantiableCloudDeviceName,
} from "./devices/instantiableCloudDevices/index.spec";
import {peerconnectionData, PeerconnectionName} from "./peerconnections/index.spec";
import {GenericTestData} from "@crosslab/service-common/test-helper";

export type TestData = GenericTestData<
  [
    ["concrete devices", ConcreteDeviceName, ConcreteDeviceRepository],
    ["device groups", DeviceGroupName, DeviceGroupRepository],
    [
      "instantiable browser devices",
      InstantiableBrowserDeviceName,
      InstantiableBrowserDeviceRepository,
    ],
    [
      "instantiable cloud devices",
      InstantiableCloudDeviceName,
      InstantiableCloudDeviceRepository,
    ],
    ["devices", DeviceName, DeviceRepository],
    ["peerconnections", PeerconnectionName, PeerconnectionRepository],
  ]
> & {
  user: UserType<"JWT">;
  userData: UserData<"JWT">;
};

const testUser: UserType<"JWT"> = {
  url: "http://localhost/users/testuser",
  username: "testuser",
  scopes: ["device"],
  jwt: "JWT",
};

export function prepareTestData(): TestData {
  return {
    "concrete devices": concreteDeviceData,
    "device groups": deviceGroupData,
    "instantiable browser devices": instantiableBrowserDeviceData,
    "instantiable cloud devices": instantiableCloudDeviceData,
    devices: deviceData,
    peerconnections: peerconnectionData,
    user: testUser,
    userData: {
      JWT: testUser,
    },
  };
}
