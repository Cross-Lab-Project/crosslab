import { UpdateInformationModel } from '../database/model';
import { UpdateInformation } from '../generated/types';

/**
 * This function formats a {@link UpdateInformationModel} to a {@link UpdateInformation}.
 * @param updateInformationModel The {@link UpdateInformationModel} to be formatted.
 * @returns The resulting {@link UpdateInformation}.
 */
export function formatUpdateInformation(
  updateInformationModel: UpdateInformationModel,
): UpdateInformation {
  return {
    device_id: updateInformationModel.device_id,
    latest_version: updateInformationModel.latest_version,
    latest_version_link: updateInformationModel.latest_version_link,
  };
}
