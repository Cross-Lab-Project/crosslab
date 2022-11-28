import { TypeScriptFilterCollection } from './filters/typescript'
import { Addon } from '@cross-lab-project/openapi-codegen'
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
        }
    ],
}

export default CrosslabTypeScriptAddon
