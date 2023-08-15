import {repositories} from "../../../../database/dataSource";
import {postDevicesByDeviceIdAvailabilitySignature} from "../../../../generated/signatures";
import {WEEK} from "../../../../globals";
import {calculateAvailability} from "../../../../methods/availability";
import {sendChangedCallback} from "../../../../methods/callbacks";
import {checkPermission} from "../../../../methods/permission";
import {
  DeviceOwnershipError,
  ImpossibleOperationError,
  logger,
} from "@crosslab/service-common";

/**
 * This function implements the functionality for handling POST requests on /devices/{device_id}/availability endpoint.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if device is not found in the database.
 */
export const postDevicesByDeviceIdAvailability: postDevicesByDeviceIdAvailabilitySignature =
  async (parameters, body, user) => {
    logger.log("info", "postDevicesByDeviceIdAvailability called");

    const deviceModel = await repositories.device.findOneOrFail({
      where: {uuid: parameters.device_id},
    });

    if (deviceModel.type !== "device") {
      throw new ImpossibleOperationError(
        `Can only update the availability for a device of type 'device', not for type '${deviceModel.type}'`,
        400,
      );
    }

    if (!checkPermission("write", deviceModel, user.JWT))
      throw new DeviceOwnershipError();

    deviceModel.availabilityRules ??= [];
    deviceModel.availabilityRules.push(...(body ?? []));

    const start = Date.now();
    const end = start + WEEK;
    deviceModel.announcedAvailability = calculateAvailability(
      deviceModel.availabilityRules,
      start,
      end,
    );

    await repositories.device.save(deviceModel);
    await sendChangedCallback(deviceModel);

    logger.log("info", "postDevicesByDeviceIdAvailability succeeded");

    return {
      status: 200,
      body: deviceModel.announcedAvailability,
    };
  };
