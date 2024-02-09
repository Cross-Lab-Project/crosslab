import { JSONSchemaFaker } from 'deterministic-json-schema-faker';
import { OpenAPIV3_1 } from 'openapi-types';
import seedrandom from 'seedrandom';

export function formatPath_filter(path: string) {
  const splitPath = path.split('/').slice(1);
  return splitPath
    .map(el => {
      if (el.startsWith('{') && el.endsWith('}')) el = '#';
      el = el.replace(/[{}]/gi, '');
      return el;
    })
    .join('_')
    .replace(/s_#/, '_')
    .replace(/#/, '');
}

export function hasPathParameter_filter(path: OpenAPIV3_1.PathItemObject) {
  const res = path.parameters?.some(
    p => (p as OpenAPIV3_1.ParameterObject).in === 'path',
  );
  return res ? true : false;
}

export function upperCamelCase_filter(data: string) {
  return data
    .replaceAll('-', '_')
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

export function lowerCamelCase_filter(data: string) {
  return data
    .replaceAll('-', '_')
    .split('_')
    .map((s, i) => {
      if (i === 0) return s.charAt(0).toLowerCase() + s.slice(1);
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join('');
}

export function lowerSnakeCase_filter(data: string) {
  return data
    .replaceAll('-', '_')
    .split('_')
    .map(s => s.charAt(0).toLowerCase() + s.slice(1))
    .join('_');
}

export function replaceRegEx_filter(data: string, regex: string, replace: string) {
  return data.replace(new RegExp(regex, 'g'), replace);
}

export async function await_filter(promise: Promise<object>, callback: CallableFunction) {
  try {
    callback(null, await promise);
  } catch (err) {
    callback(err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setAdditionalProperties(schema: any) {
  if (schema.type === 'object') {
    schema.additionalProperties = false;
  }
  if (schema.properties) {
    for (const key of Object.keys(schema.properties)) {
      setAdditionalProperties(schema.properties[key]);
    }
  }
  if (schema.anyOf) {
    for (const s of schema.anyOf) {
      setAdditionalProperties(s);
    }
  }
  if (schema.allOf) {
    for (const s of schema.allOf) {
      setAdditionalProperties(s);
    }
  }
  if (schema.items) {
    setAdditionalProperties(schema.items);
  }
  return schema;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsf_filter(schema: any) {
  schema = setAdditionalProperties(schema);
  JSONSchemaFaker.option({ random: seedrandom(schema), useExamplesValue: true });
  return JSONSchemaFaker.generate(schema);
}

export function permuteOptionalArgs_filter(args: Array<string>) {
  let products: Array<Array<string>> = [[]];
  for (let i = 0; i < args.length; i++) {
    products = [...products.map(a => [...a, args[i]]), ...products];
  }
  return products;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveRef_meta_filter(base: any) {
  return (ref: string) => {
    const path = ref.replace('#/', '').split('/');
    let obj = base;
    for (const p of path) {
      obj = obj[p];
    }
    return obj;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function merge_intersect(propA: any, propB: any) {
  if (propA && propB) {
    return [...propA].filter(x => propB.has(x));
  }
  return propA ?? propB;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function merge_union(propA: any, propB: any) {
  return [...new Set([...(propA ?? []), ...(propB ?? [])])];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function merge_single(propA: any, propB: any) {
  if (propA && propB) {
    if (propA !== propB) throw new Error("can't merge");
    return propA;
  }
  return propA ?? propB;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonSchemaCombineAllOf_meta_filter(base: any) {
  const resolve = resolveRef_meta_filter(base);
  const jsonSchemaCombineAllOf_filter = (
    schema: OpenAPIV3_1.SchemaObject,
  ): OpenAPIV3_1.SchemaObject => {
    const new_schema: OpenAPIV3_1.SchemaObject = {};
    for (const arg of schema.allOf ?? []) {
      let resolved_arg = '$ref' in arg ? resolve(arg.$ref) : arg;
      if (resolved_arg.allOf) {
        resolved_arg = jsonSchemaCombineAllOf_filter(resolved_arg);
      }
      if (resolved_arg.type !== 'object')
        throw new Error('can only combine object types ' + JSON.stringify(resolved_arg));
      for (const prop of Object.keys(resolved_arg.properties ?? {})) {
        if (new_schema.properties?.[prop]) {
          const propA = new_schema.properties?.[
            prop
          ] as unknown as OpenAPIV3_1.SchemaObject;
          const propB = resolved_arg.properties?.[prop];
          const merged_prop = {
            ...propA,
            ...propB,
            enum: merge_intersect(propA.enum, propB.enum),
            const: merge_single(propA.const, propB.const),
          };
          new_schema.properties = {
            ...new_schema.properties,
            ...{ [prop]: merged_prop },
          };
        } else {
          new_schema.properties = {
            ...new_schema.properties,
            ...{ [prop]: resolved_arg.properties?.[prop] },
          };
        }
      }
      if (resolved_arg.required) {
        new_schema.required = merge_union(new_schema.required, resolved_arg.required);
      }
      for (const key of Object.keys(resolved_arg)) {
        if (key !== 'properties' && key !== 'required') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (new_schema as any)[key] = merge_single(
            resolved_arg[key],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (new_schema as any)[key],
          );
        }
      }
    }
    return new_schema;
  };
  return jsonSchemaCombineAllOf_filter;
}
