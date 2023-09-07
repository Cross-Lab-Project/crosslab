import { RoleEntityDataWithLinks } from './index.spec.js';

const name = 'Example Role';
const description = 'This is an example role.';

export const example_role: RoleEntityDataWithLinks = {
    request: {
        name,
        description,
    },
    model: {
        uuid: '449ea703-7811-4c18-a19e-eb8a5422974f',
        name,
        description,
        experiment: 'example experiment',
    },
    response: {
        name,
        description,
    },
};
