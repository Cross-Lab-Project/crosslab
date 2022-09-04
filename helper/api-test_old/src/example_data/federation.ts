import { Institution } from "@cross-lab-project/api-client/dist/generated/federation/types";

interface ExampleInstitutions {
    0: Institution
    1: Institution
    [k: string]: Institution
}

export const exampleInstitutions: ExampleInstitutions = {
    0: {
        name: "TU Ilmenau",
        homepage: "https://crosslab.com",
        api: "https://api.crosslab.com",
        federatedApi: "https://api.crosslab.com/federation",
        apiToken: "5202de35-7f61-4eed-a361-e627619f9d19"
    },
    1: {

        name: "Localhost",
        homepage: "http://localhost:80",
        api: "http://localhost:3001",
        federatedApi: "http://localhost:3001/federation",
        apiToken: "rewq32r2-7f61-4eed-a361-efw8q0h32rze"
    }
}