const fs = require('fs');

const api_documents = [
    '../auth/dist/openapi.json', 
    '../booking/dist/openapi.json', 
    '../device/dist/openapi.json', 
    '../experiment/dist/openapi.json', 
    '../federation/dist/openapi.json', 
    '../update/dist/openapi.json'
];

// Make sure the ./gen directory exists
if (!fs.existsSync('./gen')) {
    fs.mkdirSync('./gen');
}

const paths = {};
const securitySchemes = {}

// Read all the api documents and write them to the ./gen directory
api_documents.forEach((api_document) => {
    const api = JSON.parse(fs.readFileSync(api_document, 'utf8'));

    if (api.components) {
        if (api.components.schemas) {
            Object.keys(api.components.schemas).forEach((schema) => {
                api.components.schemas[schema]['x-service-name'] = api.info['x-service-name']
            })
        }
        if (api.components.parameters) {
            Object.keys(api.components.parameters).forEach((parameter) => {
                if (api.components.parameters[parameter].schema) {
                    api.components.parameters[parameter].schema['x-service-name'] = api.info['x-service-name']
                }
            })
        }
    }

    // Remove internal paths and methods
    Object.keys(api.paths).forEach((path) => {
        if (api.paths[path]['x-internal']) {
            delete api.paths[path];
        } else {
            Object.keys(api.paths[path]).forEach((method) => {
                api.paths[path][method]['x-service-name'] = api.info['x-service-name']
                if (api.paths[path][method]['x-internal']) {
                    delete api.paths[path][method];
                }
            });
            if (Object.keys(api.paths[path]).length == 0) {
                delete api.paths[path];
            }
        }
    });

    // Replace all security definitions in paths with the default security definition
    Object.keys(api.paths).forEach((path) => {
        Object.keys(api.paths[path]).forEach((method) => {
            if (api.paths[path][method].security) {
                for (const sec of api.paths[path][method].security) {
                    Object.keys(sec).forEach((s) => {
                        delete api.components.securitySchemes[s].description
                        securitySchemes[s] = api.components.securitySchemes[s]
                    })
                }
            }
        });
    });

    const api_name = api.info.title;
    const api_version = api.info.version;
    const api_filename = `${api_name}-${api_version}.json`;

    // Keep track of all paths:
    Object.keys(api.paths).forEach((path) => {
        paths[path] = { "$ref": `./${api_filename}#/paths/${path.replaceAll('/', '~1')}` };
    });

    fs.writeFileSync(`./gen/${api_filename}`, JSON.stringify(api, null, 2));
});

// Write paths.json
fs.writeFileSync('./gen/paths.json', JSON.stringify(paths, null, 2));

// Write securitySchemes.json
fs.writeFileSync('./gen/securitySchemes.json', JSON.stringify(securitySchemes, null, 2));