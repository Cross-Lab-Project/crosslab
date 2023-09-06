import * as operationsInstitutions from './institutions';
import * as operationsProxy from './proxy';

export default {
    ...operationsProxy,
    ...operationsInstitutions,
};
