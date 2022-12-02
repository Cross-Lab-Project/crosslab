import { OpenAPIV3_1 } from "openapi-types";
import {JSONSchemaFaker} from 'json-schema-faker';
import seedrandom from 'seedrandom';

export function formatPath_filter(path: string) {
  let splitPath = path.split("/").slice(1);
  return splitPath
    .map((el) => {
      if (el.startsWith("{") && el.endsWith("}")) el = "#";
      el = el.replace(/[{}]/gi, "");
      return el;
    })
    .join("_")
    .replace(/s_#/, "_")
    .replace(/#/, "");
}

export function hasPathParameter_filter(path: OpenAPIV3_1.PathItemObject) {
  const res = path.parameters?.some(
    (p) => (p as OpenAPIV3_1.ParameterObject).in === "path"
  );
  return res ? true : false;
}

export function upperCamelCase_filter(data: string) {
  return data
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

export function lowerCamelCase_filter(data: string) {
  return data
    .split("_")
    .map((s, i) => {
      if (i === 0) return s.charAt(0).toLowerCase() + s.slice(1);
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join("");
}

export function lowerSnakeCase_filter(data: string) {
  return data
    .split("_")
    .map((s) => s.charAt(0).toLowerCase() + s.slice(1))
    .join("_");
}

export function replaceRegEx_filter(data: string, regex: string, replace: string) {
  return data.replace(new RegExp(regex, "g"), replace);
}

export async function await_filter(promise: Promise<any>, callback: any) {
  try {
    callback(null, await promise);
  } catch (err) {
    callback(err);
  }
}

function setAdditionalProperties(schema: any) {
  if (schema.type === "object") {
    schema.additionalProperties = false;
  }
  if (schema.properties) {
    for (const key of Object.keys(schema.properties)) {
      setAdditionalProperties(schema.properties[key]);
    }
  }
  if (schema.anyOf){
    for (const s of schema.anyOf){
      setAdditionalProperties(s);
    }
  }
  if (schema.allOf){
    for (const s of schema.allOf){
      setAdditionalProperties(s);
    }
  }
  if (schema.items){
    setAdditionalProperties(schema.items);
  }
  return schema;
}
export function jsf_filter(schema: any){
  schema=setAdditionalProperties(schema);
  JSONSchemaFaker.option({random: seedrandom(schema),useExamplesValue: true});
  return JSONSchemaFaker.generate(schema);
}

export function permuteOptionalArgs_filter(args: Array<string>) {
  let products: Array<Array<string>> = [[]];
  for (let i = 0; i < args.length; i++) {
    products = [...products.map(a => [...a, args[i]]), ...products];
  }
  return products;
}