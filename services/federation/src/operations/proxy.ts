import { HttpError, MissingParameterError, logger } from '@crosslab/service-common';
import fetch, { HeadersInit } from 'node-fetch';

import { repositories } from '../database/dataSource.js';
import {
  deleteProxySignature,
  getProxySignature,
  headProxySignature,
  optionsProxySignature,
  patchProxySignature,
  postProxySignature,
  putProxySignature,
  traceProxySignature,
} from '../generated/signatures.js';

type HttpMethod =
  | 'get'
  | 'post'
  | 'patch'
  | 'delete'
  | 'options'
  | 'head'
  | 'trace'
  | 'put';
type proxySignature =
  | getProxySignature
  | postProxySignature
  | patchProxySignature
  | deleteProxySignature
  | optionsProxySignature
  | headProxySignature
  | traceProxySignature
  | putProxySignature;

/**
 * This function is used to generate the functions for handling requests on the /proxy endpoint.
 * @param method The http method to be used.
 */
const proxy: (method: HttpMethod) => proxySignature =
  (method: HttpMethod) => async (_req, parameters, body) => {
    if (!parameters.URL) throw new MissingParameterError(`Missing URL Parameter`, 400);

    const basePathMatch = parameters.URL.match(/.*?:\/\/.*?(?=\/|$)/gm);

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (basePathMatch) {
      const basePath = basePathMatch[0];

      const institution = await repositories.institution.findOneOrFail({
        where: { api: basePath },
      });

      if (institution) {
        headers['Authorization'] = 'Bearer ' + institution.apiToken;
      }
    }

    const response = await fetch(parameters.URL, {
      headers,
      method: method,
      body: Object.keys(body).length > 0 ? body : undefined,
    });

    if (response.status < 100 || response.status >= 600) {
      throw new HttpError(500, `Response has invalid status of ${response.status}`);
    }

    try {
      const json = await response.json();

      return {
        status: response.status,
        body: json,
      } as ReturnType<proxySignature>;
    } catch (error) {
      logger.log('error', 'An error occurred while trying to parse the response', {
        data: { error },
      });

      return {
        status: 500,
        body: undefined,
      };
    }
  };

/**
 * This function implements the functionality for handling GET requests on the /proxy endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const getProxy = proxy('get');

/**
 * This function implements the functionality for handling POST requests on the /proxy endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const postProxy = proxy('post');

/**
 * This function implements the functionality for handling PATCH requests on the /proxy endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const patchProxy = proxy('patch');

/**
 * This function implements the functionality for handling DELETE requests on the /proxy endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const deleteProxy = proxy('delete');

/**
 * This function implements the functionality for handling OPTIONS requests on the /proxy endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const optionsProxy = proxy('options');

/**
 * This function implements the functionality for handling HEAD requests on the /proxy endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const headProxy = proxy('head');

/**
 * This function implements the functionality for handling TRACE requests on the /proxy endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const traceProxy = proxy('trace');

/**
 * This function implements the functionality for handling PUT requests on the /proxy endpoint.
 * @param req The incoming request.
 * @param parameters The parameters of the request.
 * @param body The body of the request.
 */
export const putProxy = proxy('put');
