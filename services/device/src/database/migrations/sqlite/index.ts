import { Setup1692095173359 } from './1692095173359-Setup.js';
import { RemoveOwnerProperty1701781240608 } from './1701781240608-RemoveOwnerProperty.js';

export const Migrations = [Setup1692095173359, RemoveOwnerProperty1701781240608];
// typeorm-ts-node-commonjs migration:generate -d src/database/dataSource.ts src/database/migrations/sqlite/Setup
