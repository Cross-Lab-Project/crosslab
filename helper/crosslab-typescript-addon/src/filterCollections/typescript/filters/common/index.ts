import { Filter } from '@cross-lab-project/openapi-codegen';

import { addPropertyFilter } from './addProperty';
import { appendFilter } from './append';
import { attributeFilter } from './attribute';
import { capitalizeFilter } from './cap';
import { cloneFilter } from './clone';
import { deleteFilter } from './delete';
import { endsWithFilter } from './endsWith';
import { flattenFilter } from './flatten';
import { includesFilter } from './includes';
import { sortByAttributeFilter } from './sortByAttribute';
import { splitFilter } from './split';
import { startsWithFilter } from './startsWith';
import { stringifyFilter } from './stringify';
import { toStringsFilter } from './toStrings';
import { uniqueFilter } from './unique';

export const commonFilters: Filter[] = [
  addPropertyFilter,
  appendFilter,
  attributeFilter,
  capitalizeFilter,
  cloneFilter,
  deleteFilter,
  endsWithFilter,
  flattenFilter,
  includesFilter,
  sortByAttributeFilter,
  splitFilter,
  startsWithFilter,
  stringifyFilter,
  toStringsFilter,
  uniqueFilter,
];
