import { config } from '../../config';
import * as mariadb from './mariadb';

export const Migrations = (() => {
    switch (config.orm.type) {
        case 'mariadb':
            return mariadb.Migrations;
        default:
            return [];
    }
})();
