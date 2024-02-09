import { config } from '../../config.js';
import * as mariadb from './mariadb/index.js';
import * as sqlite from './sqlite/index.js';

export const Migrations = (() => {
  switch (config.orm.type) {
    case 'sqlite':
      return sqlite.Migrations;
    case 'mariadb':
      return mariadb.Migrations;
    default:
      return [];
  }
})();
