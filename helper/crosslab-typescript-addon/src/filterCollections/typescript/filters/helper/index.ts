import { Filter } from '@cross-lab-project/openapi-codegen';

import { getInvalidStatusCodeFilter } from './getInvalidStatusCode';
import { getPossibleScopeCombinationsFilter } from './getPossibleScopeCombinations';

export const helperFilters: Filter[] = [
  getInvalidStatusCodeFilter,
  getPossibleScopeCombinationsFilter,
];
