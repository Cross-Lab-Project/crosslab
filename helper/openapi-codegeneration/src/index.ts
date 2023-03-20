#! /usr/bin/env node
import { Option, program } from "commander";
import SwaggerParser from "@apidevtools/swagger-parser";
import {
  quicktype,
  InputData,
  JSONSchemaInput,
  FetchingJSONSchemaStore,
} from "quicktype-core";

import nunjucks from "nunjucks";
import {
  await_filter,
  formatPath_filter,
  hasPathParameter_filter,
  jsf_filter,
  lowerCamelCase_filter,
  lowerSnakeCase_filter,
  permuteOptionalArgs_filter,
  replaceRegEx_filter,
  upperCamelCase_filter,
} from "./filter";
import { readdirSync, writeFileSync, mkdirSync, readFileSync } from "fs";
import { OpenAPIV3_1 } from "openapi-types";
import { join, resolve } from "path";
import yaml from "yaml";

import {
  activateFilterCollection,
  activatePreset,
  loadPreset,
  Preset,
} from "./addon";

export { Addon, Preset, FilterCollection, Filter, Global } from "./addon";

let inputData: InputData;
const schema_mapping: string[] = [];

const schemas_cache: Record<string, string> = {};
async function schemas(language: string) {
  if (schemas_cache[language]) {
    return schemas_cache[language];
  }
  const res = await quicktype({
    inputData,
    lang: "python",
    rendererOptions: {
      "just-types": "false",
      "nice-property-names": "true",
    },
  });
  schemas_cache[language] = res.lines.join("\n");
  return schemas_cache[language];
}

async function type(language: string, type_name: string) {
  const s = await schemas(language);
  const re = new RegExp(`^def (.*)_from_dict\\(.*\\) -> (.*):$`, "gm");
  const m = Array.from(s.matchAll(re));
  const i = schema_mapping.indexOf(type_name);
  if (i >= 0) return m[i][2];
  return undefined;
}

async function transformerFromDict(language: string, type_name: string) {
  const s = await schemas(language);
  const re = new RegExp(`^def (.*)_from_dict\\(.*\\) -> (.*):$`, "gm");
  const m = Array.from(s.matchAll(re));
  const i = schema_mapping.indexOf(type_name);
  if (i >= 0) return m[i][1] + "_from_dict";
  return undefined;
}

async function transformerToDict(language: string, type_name: string) {
  const s = await schemas(language);
  const re = new RegExp(`^def (.*)_from_dict\\(.*\\) -> (.*):$`, "gm");
  const m = Array.from(s.matchAll(re));
  const i = schema_mapping.indexOf(type_name);
  if (i >= 0) return m[i][1] + "_to_dict";
  return undefined;
}

async function main() {
  program
    .name("openapi-codegeneration")
    .description("Generate code from an OpenAPI service")
    .version("0.2.0")
    .requiredOption("-i, --input <strings...>", "openapi input file")
    .requiredOption("-t, --template <string>", "openapi template name")
    .requiredOption("-o, --output <string>", "openapi output directory")
    .option("-f, --filters <string...>", "filter collections to load")
    .option("--keep-refs", "keep references")
    .addOption(
      new Option("-p, --preset <string>")
        .implies({ template: "" })
        .conflicts("-f")
    );

  program.parse();
  const options = program.opts();

  if (options.filters) {
    options.filters.foreach((fc: string) => activateFilterCollection(fc, env));
  }

  let templateDir = resolve(__dirname, "../templates", options.template);
  let preset: undefined | Preset;
  if (options.preset) {
    preset = await loadPreset(options.preset);
    templateDir = preset.templatesDir;
  }
  
  if (options.template.startsWith(".")) {
    templateDir = resolve(process.cwd(), options.template);
  }

  const env = nunjucks.configure(templateDir, {
    autoescape: false,
    noCache: true,
  });
  env.addFilter("formatPath", formatPath_filter);
  env.addFilter("hasPathParameter", hasPathParameter_filter);
  env.addFilter("upperCamelCase", upperCamelCase_filter);
  env.addFilter("lowerCamelCase", lowerCamelCase_filter);
  env.addFilter("lowerSnakeCase", lowerSnakeCase_filter);
  env.addFilter("replaceRegEx", replaceRegEx_filter);
  env.addFilter("jsf", jsf_filter);
  env.addFilter("permuteOptionalArgs", permuteOptionalArgs_filter);
  env.addFilter("await", await_filter, true);
  env.addGlobal("schemas", schemas);
  env.addGlobal("type", type);
  env.addGlobal("transformerFromDict", transformerFromDict);
  env.addGlobal("transformerToDict", transformerToDict);
  
  if (preset) {
    activatePreset(preset, env);
  }
  
  const inputs: string = options.input;

  function loadAndDeref(input: string): string {
    const file = readFileSync(input, "utf8");
    const schema = yaml.parse(file);
    return JSON.stringify(schema).replace(
      /{[^{}]*"\$ref":"([^"]*)"[^{}]*}/g,
      (_substring, group: string) => {
        return loadAndDeref(resolve(join(input, "..", group)));
      }
    );
  }

  inputData = new InputData();
  let api: undefined | OpenAPIV3_1.Document = undefined;
  for (const input of inputs) {
    try {
      const openApi = (
        options["keepRefs"]
          ? await SwaggerParser.parse(input)
          : await SwaggerParser.validate(input)
      ) as OpenAPIV3_1.Document;
      if (openApi.openapi !== "3.1.0") {
        console.error(
          `Only OpenAPI 3.1.0 is supported, but ${openApi.openapi} was provided. Please upgrade your OpenAPI file.`
        );
        process.exit(1);
      }
      if (api !== undefined) {
        console.error(
          "Multiple OpenAPI Specifications in input files. This tools only support one OpenAPI document at a time."
        );
        process.exit(1);
      }
      api = openApi;
      inputData = extractSchemasFromOpenAPI(inputData, api);
    } catch (e) {
      // parse input as normal yaml file
      const schema = JSON.parse(loadAndDeref(input));
      addJsonSchema(schema.title ?? input, schema, inputData);
    }
  }

  const context = {
    api,
    ...api,
    schemas,
  };

  const outputDir = resolve(process.cwd(), options.output);
  // make sure outputDir exists
  mkdirSync(outputDir, { recursive: true });

  // render all templates in the template directory

  for (const file of readdirSync(templateDir)) {
    const template = join(templateDir, file);
    const output = join(outputDir, file.replace(".njk", ""));

    nunjucks.render(template, context, (err, res) => {
      console.log(`Writing ${output}`);
      if (err) console.error(err);
      writeFileSync(output, res as string);
    });
  }
}

main();

function extractSchemasFromOpenAPI(
  schemasIn: InputData,
  api: OpenAPIV3_1.Document
): InputData {
  if (api.paths) {
    for (const path of Object.keys(api.paths)) {
      const pathItem = api.paths[path] as OpenAPIV3_1.PathItemObject;
      for (const method of Object.keys(pathItem)) {
        const operation = pathItem[
          method as OpenAPIV3_1.HttpMethods
        ] as OpenAPIV3_1.OperationObject;
        extractAndAddSchema(
          operation.requestBody,
          `${method}_${formatPath_filter(path)}_request_body`
        );

        const responses = operation.responses;
        for (const key in responses) {
          extractAndAddSchema(
            responses[key],
            `${method}_${formatPath_filter(path)}_response_body_${key}`
          );
        }
      }
    }
  }
  return schemasIn;

  function extractAndAddSchema(
    contentObject:
      | OpenAPIV3_1.ReferenceObject
      | OpenAPIV3_1.ResponseObject
      | OpenAPIV3_1.RequestBodyObject
      | undefined,
    name: string
  ) {
    if (contentObject) {
      if ("content" in contentObject) {
        const content = contentObject.content;
        if (content) {
          const schema = content["application/json"].schema;
          addJsonSchema(name, schema, schemasIn);
        }
      }
    }
  }
}

function addJsonSchema(
  name: string,
  schema: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject | undefined,
  schemasIn: InputData
) {
  const _name = lowerSnakeCase_filter(name);
  if (schema) {
    schema_mapping.push(_name);
    schema_mapping.push(_name + "_write");
    schema_mapping.push(_name + "_read");
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
    const schemaInputWrite = new JSONSchemaInput(new FetchingJSONSchemaStore());
    const schemaInputRead = new JSONSchemaInput(new FetchingJSONSchemaStore());
    schemasIn.addInput(schemaInput);
    schemasIn.addInput(schemaInputWrite);
    schemasIn.addInput(schemaInputRead);

    let schema_string = JSON.stringify(schema);
    if (schema_string.includes('"const":')) {
      schema_string = schema_string.replace(
        /"const":("[^"]*")/g,
        `"enum":[$1]`
      );
    }

    let schema_string_write = schema_string;
    let schema_string_read = schema_string;
    if (
      schema_string.includes('"readOnly":') ||
      schema_string.includes('"writeOnly":')
    ) {
      schema_string_write = schema_string.replace(
        /"[^"]*?": {[^{}]*?"readOnly": true[^{}]*?}/gms,
        ``
      );
      schema_string_read = schema_string.replace(
        /"[^"]*?": {[^{}]*?"Only": true[^{}]*?}/gms,
        ``
      );
    }

    schemaInput.addSource({
      name: _name,
      schema: schema_string,
    });
    schemaInputWrite.addSource({
      name: _name + "_write",
      schema: schema_string_write,
    });
    schemaInputRead.addSource({
      name: _name + "_read",
      schema: schema_string_read,
    });
  }
}
