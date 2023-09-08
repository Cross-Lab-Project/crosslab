import { DataSourceOptions } from 'typeorm';

import * as mariadb from './mariadb';
import * as sqlite from './sqlite';

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
