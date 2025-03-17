import { Command } from 'commander';

import { CRUD } from './common.js';

export function lti(program: Command) {
  const lti = program.command('lti');

  const platform = lti.command('platform');
  CRUD(platform, {
    create: 'registerPlatform',
    list: 'listPlatform',
    read: 'getPlatform',
    update: 'updatePlatform',
    del: 'deletePlatform'
  }, 'platform', (item) => ({ name: item.ltiname, url: item.url }));

  //CRUD(platform,{list:'listResource',
  //  read:'getResource',
  //  update:'updateResource',
  //  del:'deleteResource'},
  //  'resource',
  //  (item: any) => ({ name: item.ltiname,
  //  url: item.url }));
  //CRUD(platform,{create: 'ltiJwks',
  //  list:'listResource',
  //  read:'getPlatform',
  //  update:'updatePlatform',
  //  del:'deletePlatform'},
  //  'lti',
  //  (item: any) => ({ name: item.ltiname,
  //  url: item.url }));
}
