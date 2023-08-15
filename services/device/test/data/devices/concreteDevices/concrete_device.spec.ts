import {ConcreteDeviceRepository} from "../../../../src/database/repositories/device/concreteDevice";
import {deviceUrlFromId} from "../../../../src/methods/urlFromId";
import {EntityData} from "@crosslab/service-common/test-helper";

const uuid = "32348c89-f302-408f-8582-cb9783c74fbb";
const type = "device";
const name = "Concrete Device Example";
const description = "An example for a concrete device";
const owner = "http://localhost/users/superadmin";
const isPublic = true;

const concrete_device: EntityData<ConcreteDeviceRepository> = {
  request: {
    type,
    name,
    description,
    isPublic,
  },
  model: {
    uuid,
    type,
    name,
    description,
    owner,
    isPublic,
    announcedAvailability: [],
    services: [],
    availabilityRules: [],
    connected: false,
  },
  response: {
    url: deviceUrlFromId(uuid),
    type,
    name,
    description,
    owner,
    isPublic,
    connected: false,
    announcedAvailability: [],
    services: [],
  },
};

export default concrete_device;
