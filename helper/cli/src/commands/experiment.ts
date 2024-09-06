
import { Command } from 'commander';
import { CRUD } from './common.js';

export function experiment(program: Command) {
  const experiment = program.command('experiment');
  
    CRUD(experiment,{create:'createExperiment', list:'listExperiments', read:'getExperiment', update:'updateExperiment', del:'deleteExperiment'}, 'experiment', (item: any) => ({ name: item.url, url: item.url }));
  }
  
