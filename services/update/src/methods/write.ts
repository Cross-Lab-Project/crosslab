import { UpdateInformationModel } from '../database/model';
import { UpdateInformation } from '../generated/types';

/**
 * This function writes the data of a {@link UpdateInformation} to a {@link UpdateInformationModel}.
 * @param updateInformationModel The {@link UpdateInformationModel} the data should be written to.
 * @param updateInformation The {@link UpdateInformation} providing the data to be written.
 */
export function writeUpdateInformation(
    updateInformationModel: UpdateInformationModel,
    updateInformation: UpdateInformation,
) {
    updateInformationModel.device_id = updateInformation.device_id;
    updateInformationModel.latest_version = updateInformation.latest_version;
    updateInformationModel.latest_version_link = updateInformation.latest_version_link;
}
