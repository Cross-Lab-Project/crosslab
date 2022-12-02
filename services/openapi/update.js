const fs = require('fs');

const api = JSON.parse(fs.readFileSync('dist/openapi.json', 'utf8'));
const securitySchemes = JSON.parse(fs.readFileSync('gen/securitySchemes.json', 'utf8'));

api.components.securitySchemes = securitySchemes

fs.writeFileSync('dist/openapi.json', JSON.stringify(api, null, 2))