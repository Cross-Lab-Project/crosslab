import { Filter } from '@cross-lab-project/openapi-codegen';
import { OpenAPIV3_1 } from 'openapi-types';

function getPossibleScopeCombinations(
  security?: OpenAPIV3_1.SecurityRequirementObject[],
) {
  const possibleCombinations: [string, string][][] = [];
  for (const securityRequirement of security ?? []) {
    let combinations: [string, string][][] = [];
    for (const key in securityRequirement) {
      const scopes = securityRequirement[key];
      if (combinations.length === 0) {
        for (const scope of scopes) {
          combinations.push([[key, scope]]);
        }
      } else {
        for (const scope of scopes) {
          combinations = combinations.map(comb => [...comb, [key, scope]]);
        }
      }
    }
    possibleCombinations.push(...combinations);
  }

  return possibleCombinations;
}

export const getPossibleScopeCombinationsFilter: Filter = {
  name: 'getPossibleScopeCombinations',
  function: getPossibleScopeCombinations,
};
