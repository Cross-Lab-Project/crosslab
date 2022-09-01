import { UpdateInformation } from '../generated/types'
import { UpdateInformationModel } from '../model'

/**
 * This function formats a {@link UpdateInformationModel} to a {@link UpdateInformation}.
 * @param updateInformationModel The {@link UpdateInformationModel} to be formatted.
 * @returns The resulting {@link UpdateInformation}.
 */
export function formatUpdateInformation(
    updateInformationModel: UpdateInformationModel
): UpdateInformation {
    return {
        device_id: updateInformationModel.device_id,
        newest_version: updateInformationModel.newest_version,
        newest_version_link: updateInformationModel.newest_version_link,
    }
}
