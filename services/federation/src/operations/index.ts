import * as operationsInstitutions from './institutions.js';
import * as operationsProxy from './proxy.js';

export default {
    ...operationsProxy,
    ...operationsInstitutions,
};
