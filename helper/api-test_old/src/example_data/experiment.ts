import { Experiment } from "@cross-lab-project/api-client/dist/generated/experiment/types"

interface ExampleExperiments {
    basic: Experiment
    [key: string]: Experiment
}

export const exampleExperiments: ExampleExperiments = {
    basic: {
        bookingTime: {
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 3600000).toISOString()
        },
        connections: [],
        devices: [],
        roles: [],
        serviceConfigurations: [],
        status: "created"
    }
}