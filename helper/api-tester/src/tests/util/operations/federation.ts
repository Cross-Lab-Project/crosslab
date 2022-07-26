import { APIClient } from "@cross-lab-project/api-client"
import { Institution } from "@cross-lab-project/api-client/dist/generated/federation/types"
import assert, { fail } from "assert"
import { exampleInstitutions } from "../../../example_data/federation.js"
import { getId } from "../common.js"
import { compareInstitutions } from "../compare/federation.js"

export async function createInstitution(apiClient: APIClient, createdInstitutions: Institution[], values?: Partial<Institution>): Promise<Institution> {
    const institution = exampleInstitutions[0]
    if (values) {
        if (values.api) institution.api = values.api
        if (values.apiToken) institution.apiToken = values.apiToken
        if (values.federatedApi) institution.federatedApi = values.federatedApi
        if (values.homepage) institution.homepage = values.homepage
        if (values.name) institution.name = values.name
    }

    const response = await apiClient.postInstitutions(institution)
    assert(response.status == 201, "Unexpected response status")
    assert(compareInstitutions(response.body, institution))

    createdInstitutions.push(response.body)

    return response.body
}

export async function deleteInstitutions(apiClient: APIClient, createdInstitutions: Institution[]) {
    while (createdInstitutions.length > 0) {
        const institution = createdInstitutions.pop()
        assert(institution, "Institution is undefined")
        const response = await apiClient.deleteInstitutionsByInstitutionId({ institution_id: getId(institution) })
        assert(response.status == 204, "Unexpected response status")
    }
}