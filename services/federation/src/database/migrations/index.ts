import * as mariadb from './mariadb';
import * as sqlite from './sqlite';
import { DataSourceOptions } from 'typeorm';

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
