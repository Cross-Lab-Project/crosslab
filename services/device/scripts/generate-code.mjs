import { compile } from 'json-schema-to-typescript'
import fs from 'fs'

async function compile_schemas(){
    const content = fs.readFileSync("./dist/openapi.json", 'utf8');
    const openapi=JSON.parse(content);
    const properties=Object.fromEntries(Object.keys(openapi.components.schemas).map(x=>[x,{"$ref": "#/components/schemas/"+x}]));
    const superschema={title: "superschema", properties: properties,components: openapi.components};

    let ts=await compile(superschema)
    ts=ts.replace(/export interface Superschema \{[\s\S]*?\}/gm,"")
    fs.mkdirSync('./src/generated/', {recursive: true})
    fs.writeFileSync('./src/generated/schemas.ts', ts)
}

compile_schemas();