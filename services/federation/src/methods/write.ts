import { Institution } from '../generated/types'
import { InstitutionModel } from '../model'

/**
 * This function writes the data of a {@link Institution} to a {@link InstitutionModel}.
 * @param institutionModel The {@link InstitutionModel} the data should be written to.
 * @param institution The {@link Institution} providing the data to be written.
 */
export function writeInstitution(
    institutionModel: InstitutionModel,
    institution: Institution
) {
    if (institution.name) institutionModel.name = institution.name
    if (institution.api) institutionModel.api = institution.api
    if (institution.apiToken) institutionModel.apiToken = institution.apiToken
    if (institution.homepage) institutionModel.homepage = institution.homepage
    if (institution.federatedApi) institutionModel.federatedApi = institution.federatedApi
}
