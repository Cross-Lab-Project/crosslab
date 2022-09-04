import { APIClient } from "@cross-lab-project/api-client"
import { Experiment } from "@cross-lab-project/api-client/dist/generated/experiment/types"
import assert, { fail } from "assert"
import { getId } from "../common.js"
import { compareExperiments } from "../compare/experiment.js"

export async function createExperiment(apiClient: APIClient, createdExperiments: Experiment[], experiment: Experiment): Promise<Experiment> {
    const response = await apiClient.postExperiments(experiment)
    assert(response.status == 201, "Unexpected response status")
    assert(compareExperiments(response.body, experiment, { url: false, bookingTime: false, connections: false, devices: false, roles: false, serviceConfigurations: { configuration: false, participants: false, serviceType: false }, status: false }), "Comparison failed")

    createdExperiments.push(response.body)

    return response.body
}

export async function deleteExperiments(apiClient: APIClient, experiments: Experiment[]) {
    while (experiments.length > 0) {
        const experiment = experiments.pop()
        assert(experiment, "Device is undefined")
        const response = await apiClient.deleteExperimentsByExperimentId({ experiment_id: getId(experiment) })
        assert(response.status == 204, "Unexpected response status")
    }
}