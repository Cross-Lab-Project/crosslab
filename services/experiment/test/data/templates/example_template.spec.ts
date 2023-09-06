import { TemplateRepository } from '../../../src/database/repositories/template';
import { Template } from '../../../src/generated/types';
import { templateUrlFromId } from '../../../src/methods/url';
import { EntityData } from '@crosslab/service-common/test-helper';

const name = 'Example Template';
const description = 'This is an example template.';

// TODO: finish configuration
const configuration: Template['configuration'] = {
    devices: [],
    roles: [],
    serviceConfigurations: [],
};

const uuid = 'e8ed0564-6b2b-4348-a733-f34f37998939';

export const example_template: EntityData<TemplateRepository> = {
    request: {
        name,
        description,
        configuration,
    },
    model: {
        uuid,
        name,
        description,
        configuration,
    },
    response: {
        url: templateUrlFromId(uuid),
        name,
        description,
        configuration,
    },
};
