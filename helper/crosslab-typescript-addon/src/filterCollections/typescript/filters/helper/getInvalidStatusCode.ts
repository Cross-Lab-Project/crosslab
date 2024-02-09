import { Filter } from '@cross-lab-project/openapi-codegen';

import { SimplifiedOperation } from '../../types';

/**
 * This function gets an invalid status code for an operation.
 * @param operation The operation for which to get the invalid status code.
 * @returns An invalid status code for the provided operation.
 */
function getInvalidStatusCode(operation: SimplifiedOperation) {
  const invalidStatusCodes: number[] = [];

  for (let i = 100; i < 600; i++) {
    invalidStatusCodes.push(i);
  }

  for (const response of operation.responses ?? []) {
    if (response.status.endsWith('XX')) {
      const start = parseInt(response.status.replace(/X/g, '0'));
      for (let i = start; i < start + 100; i++) {
        const foundIndex = invalidStatusCodes.findIndex(statusCode => statusCode === i);
        if (foundIndex > -1) invalidStatusCodes.splice(foundIndex, 1);
      }
    } else {
      const parsedStatusCode = parseInt(response.status);
      const foundIndex = invalidStatusCodes.findIndex(
        statusCode => statusCode === parsedStatusCode,
      );
      if (foundIndex > -1) invalidStatusCodes.splice(foundIndex, 1);
    }
  }

  return invalidStatusCodes.length > 0 ? invalidStatusCodes[0] : undefined;
}

export const getInvalidStatusCodeFilter: Filter = {
  name: 'getInvalidStatusCode',
  function: getInvalidStatusCode,
};
