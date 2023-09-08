import { Filter } from '@cross-lab-project/openapi-codegen';

import { formatExpressPathFilter } from './formatExpressPath';
import { formatNameFilter } from './formatName';
import { formatOperationFilter } from './formatOperation';

export const formatFilters: Filter[] = [
  formatExpressPathFilter,
  formatNameFilter,
  formatOperationFilter,
];
