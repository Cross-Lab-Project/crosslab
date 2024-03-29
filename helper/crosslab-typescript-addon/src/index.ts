import { Addon } from '@cross-lab-project/openapi-codegen';
import path from 'path';

import { TypeScriptFilterCollection } from './filterCollections/typescript';
import { attributeEqualTo } from './tests';

const templateDir = path.resolve(__dirname, '../../');

const CrosslabTypeScriptAddon: Addon = {
  filterCollections: [TypeScriptFilterCollection],
  presets: [
    {
      name: 'service',
      filterCollections: [TypeScriptFilterCollection],
      globals: [],
      tests: [
        {
          name: 'attrequalto',
          function: attributeEqualTo,
        },
      ],
      templatesDir: templateDir + '/templates/service',
    },
    {
      name: 'api-client',
      filterCollections: [TypeScriptFilterCollection],
      globals: [],
      tests: [
        {
          name: 'attrequalto',
          function: attributeEqualTo,
        },
      ],
      templatesDir: templateDir + '/templates/api-client',
    },
    {
      name: 'service-client:basicValidation',
      filterCollections: [TypeScriptFilterCollection],
      globals: [],
      tests: [],
      templatesDir: templateDir + '/templates/service-client-basicValidation',
    },
    {
      name: 'service:test',
      filterCollections: [TypeScriptFilterCollection],
      globals: [],
      tests: [
        {
          name: 'attrequalto',
          function: attributeEqualTo,
        },
      ],
      templatesDir: templateDir + '/templates/service-test',
    },
    {
      name: 'scopes',
      filterCollections: [TypeScriptFilterCollection],
      globals: [],
      tests: [],
      templatesDir: templateDir + '/templates/scopes',
    },
    {
      name: 'service-client',
      filterCollections: [TypeScriptFilterCollection],
      globals: [],
      tests: [
        {
          name: 'attrequalto',
          function: attributeEqualTo,
        },
      ],
      templatesDir: templateDir + '/templates/service-client',
    },
  ],
};

export default CrosslabTypeScriptAddon;
