import { DataSourceOptions } from 'typeorm';

import * as mariadb from './mariadb/index.js';
import * as sqlite from './sqlite/index.js';

export const Migrations = (type: DataSourceOptions['type']) => {
  switch (type) {
    case 'sqlite':
      return sqlite.Migrations;
    case 'mariadb':
      return mariadb.Migrations;
    default:
      return [];
  }
};
