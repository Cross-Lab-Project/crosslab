import { ExperimentServiceTypes } from '@cross-lab-project/api-client';
import chalk from 'chalk';
import { Command } from 'commander';

import { getClient } from './login.js';
import { prompt } from './prompt.js';

function shortTemplateList(
  templates: ExperimentServiceTypes.TemplateOverview[],
  printNumbers: boolean = false,
) {
  let ret: string = '';
  for (const [idx, template] of templates.entries()) {
    if (printNumbers) {
      ret += ('[' + idx + ']').padStart(4) + ' ';
    }
    ret +=
      chalk.green(template.name) +
      ' ' +
      chalk.dim(template.url) +
      ' ' +
      chalk.dim('owned by ' + template.owner) +
      '\n';
  }
  return ret;
}

async function selecteTemplate(templates: ExperimentServiceTypes.TemplateOverview[]) {
  process.stdout.write(shortTemplateList(templates, true));
  return templates[parseInt(await prompt('Select template: '))];
}

export function template(program: Command) {
  const template = program.command('template');

  template
    .command('list')
    .alias('ls')
    .action(async () => {
      const client = await getClient();
      const templates = await client.listTemplate();
      console.log(templates);
    });

  template
    .command('inspect')
    .argument('[template url]')
    .option('--json', 'Output the JSON response')
    .action(async (url: string, options) => {
      const client = await getClient();
      if (url == undefined)
        url = (await selecteTemplate(await client.listTemplate())).url;
      if (url == undefined) throw new Error('No template selected');
      const template = await client.getTemplate(url);
      if (options.json) {
        console.log(JSON.stringify(template, null, 2));
      } else {
        console.log(template);
      }
    });

  template
    .command('delete')
    .argument('[template url]')
    .action(async (url?: string) => {
      const client = await getClient();
      if (url == undefined)
        url = (await selecteTemplate(await client.listTemplate())).url;
      if (url == undefined) throw new Error('No template selected');
      await client.deleteTemplate(url);
    });

  template.command('create').action(async () => {
    const client = await getClient();
    let template = '';
    for await (const chunk of process.stdin) template += chunk;

    const exp = JSON.parse(template);

    client.createTemplate(exp);
  });

  template
    .command('update')
    .argument('[template url]')
    .action(async (url?: string) => {
      const client = await getClient();

      let template = '';
      for await (const chunk of process.stdin) template += chunk;

      if (url == undefined) throw new Error('No template selected');

      const exp = JSON.parse(template);

      client.updateTemplate(url, exp);
    });
}
