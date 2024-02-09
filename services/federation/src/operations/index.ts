import * as operationsInstitutions from './institutions/index.js';
import * as operationsProxy from './proxy.js';

export default {
  ...operationsProxy,
  ...operationsInstitutions,
};
