import { APIClient } from '@cross-lab-project/api-client';
import select from '@inquirer/select';
import { Command } from 'commander';

import { editJson, outputJson } from '../utils.js';
import { getClient } from './login.js';


type Method<T extends (...args: any[]) => any> = {
  [K in keyof APIClient]: APIClient[K] extends T ? K : never;
}[keyof APIClient];
type Methods = {
  list: Method<() => Promise<any[]>>;
  create: Method<(obj: any) => any>;
  read: Method<(url: string) => any>;
  update: Method<(url: string, body: any) => any>;
  del: Method<(url: string) => any>;
};
export function CRUD(
  program: Command,
  methods: Methods,
  objectName: string,
  toList: (item: any) => { name: string; url: string },
) {
  const promptUrl = async (client: APIClient) => {
    const items = (await client[methods.list]());
    const url = await select({
      message: 'Select item',
      choices: items.map(item => toList(item)).map(item => ({ name: item.name, value: item.url })),
    },{output: process.stderr});
    return url as string;
  };

  program
    .command('list')
    .alias('ls')
    .action(async () => {
      const client = await getClient();
      outputJson(await client[methods.list]());
    });

  program
    .command('inspect')
    .argument('['+objectName+' url]')
    .action(async (url?: string) => {
      const client = await getClient();

      url = url || (await promptUrl(client));

      outputJson(await client[methods.read](url));
    });

  program.command('create').action(async () => {
    const client = await getClient();

    const obj: any = {};
    outputJson(client[methods.create](obj));
  });

  program
    .command('update')
    .argument('['+objectName+' url]')
    .action(async (url?: string) => {
      const client = await getClient();

      url = url || (await promptUrl(client));

      const user = await editJson(await client[methods.read](url));
      outputJson(await client[methods.update](url, user));
    });

  program
    .command('delete')
    .argument('['+objectName+' url]')
    .action(async (url?: string) => {
      const client = await getClient();

      if (url == undefined) {
        console.log('Please provide a '+objectName+' url');
        return;
      }

      outputJson(await client[methods.del](url));
    });

  return {promptUrl};
}

//
//listPlatform(
//    registerPlatform(
//    getPlatform(url: string,
//    updatePlatform(url: string,
//    deletePlatform(url: string,
//    ltiLogin(url: string,body: {
//    ltiLaunch(url: string,body: {
//    ltiJwks(url: string,
//    listResource(
//    getResource(url: string,
//    updateResource(url: string,body: {
//    deleteResource(url: string,
//    listResourceStudents(url: string,
//    updateResourceStudents(url: string,body: ({
//    getResourceStudent(url: string,
//    updateResourceStudent(url: string,student: LTIServiceTypes.Student<"request">,
