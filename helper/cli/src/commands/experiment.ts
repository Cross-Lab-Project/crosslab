
import { APIClient } from '@cross-lab-project/api-client';
import { Command } from 'commander';
import open from 'open';
import { editJson } from '../utils.js';
import { CRUD } from './common.js';
import { getClient } from './login.js';

export function experiment(program: Command) {
  const experiment = program.command('experiment');
  
    CRUD(experiment,{
      create:'createExperiment',
      list:'listExperiments',
      read:'getExperiment',
      update:'updateExperiment',
      del:'deleteExperiment'
    }, 'experiment', (item) => ({ name: item.url, url: item.url }));

    experiment
      .command('run')
      .argument('[experiment url]')
      .action(async (url?: string) => {
        const client = await getClient();
  
        let obj: Awaited<ReturnType<APIClient['getExperiment']>>;
        let response: Awaited<ReturnType<APIClient['createExperiment']>>
        if (url){
          obj = await client.getExperiment(url)
          response = await client.updateExperiment(url, {...obj, status: 'running'})
        }else{
          obj = await editJson({});
          response = await client.createExperiment({...obj, status: 'running'})
        }

        for (const device of response.instantiatedDevices ?? []) {
          const url = `${ device.codeUrl }?instanceUrl=${ device.url}&deviceToken=${ device.token }`
          if (process.stdout.isTTY)
          {
              process.stdout.write(`Please open the following url, if the browser does not automatically open:\n  ${url}\n\n`)
          }
          open(url)
        }

        if (process.stdout.isTTY)
        {
            process.stdout.write(`Experiment URL: `)
        }
        process.stdout.write(response.url)
        process.stdout.write('\n')
      });
  }