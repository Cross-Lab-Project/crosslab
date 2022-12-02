import { TypeScriptFilterCollection } from './filters/typescript'
import { Addon } from '../../openapi-codegeneration/dist'
import { attributeEqualTo } from './tests'

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
            templatesDir: __dirname + '/templates/service',
        },
        {
            name: 'client',
            filterCollections: [TypeScriptFilterCollection],
            globals: [],
            tests: [{
                name: "attrequalto",
                function: attributeEqualTo
            }],
            templatesDir: __dirname + '/templates/client'
        },
        {
            name: 'client:basicValidation',
            filterCollections: [TypeScriptFilterCollection],
            globals: [],
            tests: [],
            templatesDir: __dirname + '/templates/client-basicValidation'
        }
    ],
}

export default CrosslabTypeScriptAddon
