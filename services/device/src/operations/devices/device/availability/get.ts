import {repositories} from "../../../../database/dataSource";
import {getDevicesByDeviceIdAvailabilitySignature} from "../../../../generated/signatures";
import {WEEK} from "../../../../globals";
import {calculateAvailability} from "../../../../methods/availability";
import {checkPermission} from "../../../../methods/permission";
import {
  DeviceOwnershipError,
  ImpossibleOperationError,
  logger,
} from "@crosslab/service-common";

/**
 * This function implements the functionality for handling GET requests on /devices/{device_id}/availability endpoint.
 * @param parameters The parameters of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const getDevicesByDeviceIdAvailability: getDevicesByDeviceIdAvailabilitySignature =
  async (parameters, user) => {
    logger.log("info", "getDevicesByDeviceIdAvailability called");

    const deviceModel = await repositories.device.findOneOrFail({
      where: {uuid: parameters.device_id},
    });

    if (deviceModel.type !== "device")
      throw new ImpossibleOperationError(
        "Availability can only be retrieved for devices of type 'device'",
        500,
      );

    if (!checkPermission("read", deviceModel, user.JWT)) throw new DeviceOwnershipError();

    const startTime = parameters.startTime
      ? Date.parse(parameters.startTime)
      : Date.now();
    const endTime =
      (parameters.startTime ? Date.parse(parameters.startTime) : startTime) + WEEK;

    const availability = calculateAvailability(
      deviceModel.availabilityRules,
      startTime,
      endTime,
    );

    logger.log("info", "getDevicesByDeviceIdAvailability succeeded");

    return {
      status: 200,
      body: availability,
    };
  };
