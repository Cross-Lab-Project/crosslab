import { OpenAPIV3_1 } from 'openapi-types';

import { formatName } from '../filters/format/formatName';
import { formatOperation } from '../filters/format/formatOperation';
import { SimplifiedOperation, SimplifiedParameter, SimplifiedResponse } from '../types';

/**
 * This function tries to resolve the Operations of a given OpenAPI document.
 * @param api The OpenAPI document for which to resolve the Operations.
 * @returns The resolved Operations.
 */
export function resolveOperations(api: OpenAPIV3_1.Document): SimplifiedOperation[] {
  const simplifiedOperations: SimplifiedOperation[] = [];

  if (api.paths) simplifiedOperations.push(...parsePaths(api.paths));

  return simplifiedOperations;
}

function parsePaths(paths: OpenAPIV3_1.PathsObject): SimplifiedOperation[] {
  const simplifiedOperations: SimplifiedOperation[] = [];

  for (const path of Object.keys(paths)) {
    const pathItem = paths[path] as OpenAPIV3_1.PathItemObject;
    simplifiedOperations.push(...parsePathItem(path, pathItem));
  }

  return simplifiedOperations;
}

function parsePathItem(
  path: string,
  pathItem: OpenAPIV3_1.PathItemObject,
): SimplifiedOperation[] {
  const simplifiedOperations: SimplifiedOperation[] = [];

  for (const method in pathItem) {
    const operation = pathItem[
      method as OpenAPIV3_1.HttpMethods
    ] as OpenAPIV3_1.OperationObject;

    simplifiedOperations.push(parseOperation(path, method, operation));
  }

  return simplifiedOperations;
}

function parseOperation(
  path: string,
  method: string,
  operation: OpenAPIV3_1.OperationObject,
): SimplifiedOperation {
  // Create SimplifiedOperation with known properties
  const simplifiedOperation: SimplifiedOperation = {
    name: formatOperation(path, method),
    path: path,
    method: method,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    serviceName: (operation as any)['x-service-name'],
    operationId: operation.operationId ?? '',
    security: operation.security,
    summary: operation.summary ?? '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    external: (operation as any)['x-internal'] ? false : true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    destructureInput: (operation as any)['x-destructure-input'] ?? false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildUrl: (operation as any)['x-build-url'] ?? false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    optionalUrl: (operation as any)['x-optional-url'] ?? false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isProxyRequest: (operation as any)['x-proxy-request'] ?? false,
  };

  // Search for parameters to add
  const parameters = operation.parameters as OpenAPIV3_1.ParameterObject[] | undefined;
  if (parameters) parseParameters(parameters, simplifiedOperation);

  // Search for requestBody to add
  const requestBody = operation.requestBody as OpenAPIV3_1.RequestBodyObject | undefined;
  if (requestBody) parseRequestBody(requestBody, simplifiedOperation);

  // Search for responses to add
  const responses = operation.responses as OpenAPIV3_1.ResponsesObject | undefined;
  if (responses) parseResponses(responses, simplifiedOperation);

  return simplifiedOperation;
}

function parseParameters(
  parameters: OpenAPIV3_1.ParameterObject[],
  simplifiedOperation: SimplifiedOperation,
) {
  for (const parameter of parameters) {
    simplifiedOperation.parameters ??= [];
    const simplifiedParameter: SimplifiedParameter = {
      name: parameter.name,
      required: parameter.required ?? false,
      in: parameter.in,
      description: parameter.description,
      schema: parameter.schema as OpenAPIV3_1.SchemaObject | undefined,
    };
    simplifiedOperation.parameters.push(simplifiedParameter);
  }
}

function parseRequestBody(
  requestBody: OpenAPIV3_1.RequestBodyObject,
  simplifiedOperation: SimplifiedOperation,
) {
  simplifiedOperation.requestBody = {
    description: requestBody.description,
    required: requestBody.required ?? false,
  };

  if (requestBody.content && requestBody.content['application/json'].schema) {
    simplifiedOperation.requestBody.schema =
      requestBody.content['application/json'].schema;
  }
}

function parseResponses(
  responses: OpenAPIV3_1.ResponsesObject,
  simplifiedOperation: SimplifiedOperation,
) {
  for (const status in responses) {
    const response = responses[status] as OpenAPIV3_1.ResponseObject;
    simplifiedOperation.responses ??= [];
    const simplifiedResponse: SimplifiedResponse = {
      status: status,
      description: response.description,
    };

    // Add schema of response if present
    if (response.content && response.content['application/json'].schema) {
      simplifiedResponse.schema = response.content['application/json'].schema;
    }

    // Add headers of response if present
    if (response.headers) parseHeaders(response.headers, simplifiedResponse);

    simplifiedOperation.responses.push(simplifiedResponse);
  }
}

function parseHeaders(
  headers: { [header: string]: OpenAPIV3_1.HeaderObject },
  simplifiedResponse: SimplifiedResponse,
) {
  simplifiedResponse.headers = [];
  for (const headerName in headers) {
    const header = headers[headerName] as OpenAPIV3_1.HeaderObject;
    simplifiedResponse.headers.push({
      name: formatName(headerName),
      required: header.required ?? false,
      schema: header.schema as OpenAPIV3_1.SchemaObject | undefined,
    });
  }
}
