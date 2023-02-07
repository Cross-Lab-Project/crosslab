import { TypeScriptFilterCollection } from './filters/typescript'
import { Addon } from '@cross-lab-project/openapi-codegen'
import { attributeEqualTo } from './tests'
import path from 'path'

const templateDir=path.resolve(__dirname, '../../')

const CrosslabTypeScriptAddon: Addon = {
    filterCollections: [TypeScriptFilterCollection],
    presets: [
        {
            name: 'service',
            filterCollections: [TypeScriptFilterCollection],
            globals: [],
            tests: [{
                name: "attrequalto",
                function: attributeEqualTo
            }],
            templatesDir: templateDir + '/templates/service',
        },
        {
            name: 'client',
            filterCollections: [TypeScriptFilterCollection],
            globals: [],
            tests: [{
                name: "attrequalto",
                function: attributeEqualTo
            }],
            templatesDir: templateDir + '/templates/client'
        },
        {
            name: 'client:basicValidation',
            filterCollections: [TypeScriptFilterCollection],
            globals: [],
            tests: [],
            templatesDir: templateDir + '/templates/client-basicValidation'
        },
        {
            name: 'service:test',
            filterCollections: [TypeScriptFilterCollection],
            globals: [],
            tests: [],
            templatesDir: templateDir + '/templates/service-test'
        },
        {
            name: 'scopes',
            filterCollections: [TypeScriptFilterCollection],
            globals: [],
            tests: [],
            templatesDir: templateDir + '/templates/scopes',
        },
    ],
}

export default CrosslabTypeScriptAddon
