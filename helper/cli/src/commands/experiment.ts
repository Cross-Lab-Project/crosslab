import { APIClient } from "@cross-lab-project/api-client";
import { Command } from "commander";

export function experiment(program: Command, getClient: () => APIClient) {
    const device = program.command('experiment')

    device.command('list').action(async () => {
        const client = getClient();
        const experiments = await client.listExperiments();
        console.log((experiments));
    })

    device.command('create').action(async () => {
        const client = getClient();
        let experiment=""
        for await (const chunk of process.stdin) experiment += chunk;

        const exp = JSON.parse(experiment);

        client.createExperiment(exp)
    })
}