import {repositories} from "../../../../database/dataSource";
import {deleteDevicesByDeviceIdAvailabilitySignature} from "../../../../generated/signatures";
import {checkPermission} from "../../../../methods/permission";
import {
  DeviceOwnershipError,
  ImpossibleOperationError,
  logger,
} from "@crosslab/service-common";

/**
 * This function implements the functionality for handling DELETE requests on /devices/{device_id}/availability endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const deleteDevicesByDeviceIdAvailability: deleteDevicesByDeviceIdAvailabilitySignature =
  async (parameters, user) => {
    logger.log("info", "deleteDevicesByDeviceIdAvailability called");

    const deviceModel = await repositories.device.findOneOrFail({
      where: {uuid: parameters.device_id},
    });

    if (deviceModel.type !== "device")
      throw new ImpossibleOperationError(
        "Availability rules can only be deleted for devices of type 'device'",
        400,
      );

    if (!checkPermission("write", deviceModel, user.JWT))
      throw new DeviceOwnershipError();

    deviceModel.availabilityRules = [];
    await repositories.device.save(deviceModel);

    logger.log("info", "deleteDevicesByDeviceIdAvailability succeeded");

    return {
      status: 204,
    };
  };
