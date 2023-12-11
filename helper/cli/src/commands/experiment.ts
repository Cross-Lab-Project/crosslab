import { APIClient, ExperimentServiceTypes } from '@cross-lab-project/api-client';
import { Command } from 'commander';
import { prompt } from './prompt.js';
import chalk from 'chalk';

function shortExperimentList(
  experiments: ExperimentServiceTypes.ExperimentOverview[],
  printNumbers: boolean = false,
) {
  let ret: string = '';
  for (const [idx, experiment] of experiments.entries()) {
    if (printNumbers) {
      ret += ('[' + idx + ']').padStart(4) + ' ';
    }
    ret +=
      chalk.green(experiment.status) +
      ' ' +
      chalk.dim(experiment.url) +
      '\n';
  }
  return ret;
}

async function selecteExperiment(experiments: ExperimentServiceTypes.ExperimentOverview[]) {
  process.stdout.write(shortExperimentList(experiments, true));
  return experiments[parseInt(await prompt('Select experiment: '))];
}

export function experiment(program: Command, getClient: () => APIClient) {
  const experiment = program.command('experiment');

  experiment.command('list').action(async () => {
    const client = getClient();
    const experiments = await client.listExperiments();
    console.log(experiments);
  });

  experiment
  .command('inspect')
  .argument('[experiment url]')
  .action(async (url?: string) => {
    const client = getClient();
    if (url == undefined) url = (await selecteExperiment(await client.listExperiments())).url;
    if (url == undefined) throw new Error('No device selected');
    const experiment = await client.getExperiment(url);
    console.log(experiment);
  });

  experiment.command('create').action(async () => {
    const client = getClient();
    let experiment = '';
    for await (const chunk of process.stdin) experiment += chunk;

    const exp = JSON.parse(experiment);

    client.createExperiment(exp);
  });
}
