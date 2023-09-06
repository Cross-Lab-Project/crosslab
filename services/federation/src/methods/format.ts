import { InstitutionModel } from '../database/model';
import { Institution } from '../generated/types';
import { institutionUrlFromId } from './utils';

/**
 * This function formats a {@link InstitutionModel} to a {@link Institution}.
 * @param institutionModel The {@link InstitutionModel} to be formatted.
 * @returns The resulting {@link Institution}.
 */
export function formatInstitution(institutionModel: InstitutionModel): Institution {
    return {
        name: institutionModel.name,
        api: institutionModel.api,
        url: institutionUrlFromId(institutionModel.uuid),
        homepage: institutionModel.homepage,
        federatedApi: institutionModel.federatedApi,
    };
}
