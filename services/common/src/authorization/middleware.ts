import * as express from 'express';
import { decodeJwt } from 'jose';

import { ForbiddenError, UnauthorizedError } from '../errors.js';
import { die } from '../utils.js';
import {
  AuthorizationActionTuple,
  AuthorizationConfig,
  AuthorizationRelationTuple,
  AuthorizationResponse,
  authorization_functions,
} from './authorization.js';
import { AuthorizationMockConfig, mock_authorization_functions } from './mock.js';

export type AuthorizationActionTupleWithoutSubject = Omit<
  AuthorizationActionTuple,
  'subject'
>;
export type AuthorizationRelationTupleWithoutSubject = Omit<
  AuthorizationRelationTuple,
  'subject'
>;

function bind_authorization(
  authorization_funs: ReturnType<typeof authorization_functions>,
  user: string,
) {
  const { check_authorization } = authorization_funs;

  async function bound_check_authorization(
    tuples: (AuthorizationActionTuple | AuthorizationActionTupleWithoutSubject)[],
  ): Promise<AuthorizationResponse[]>;
  async function bound_check_authorization(
    subject: string,
    action: string,
    object: string,
  ): Promise<AuthorizationResponse>;
  async function bound_check_authorization(
    action: string,
    object: string,
  ): Promise<AuthorizationResponse>;
  async function bound_check_authorization(
    subject_or_action_or_tuples:
      | string
      | (AuthorizationActionTuple | AuthorizationActionTupleWithoutSubject)[],
    action_or_object?: string,
    object?: string,
  ): Promise<AuthorizationResponse | AuthorizationResponse[]> {
    let tuples: AuthorizationActionTuple[];
    if (Array.isArray(subject_or_action_or_tuples)) {
      tuples = subject_or_action_or_tuples.map(tuple => ({
        subject: user,
        ...tuple,
      }));
      return check_authorization(tuples);
    } else if (action_or_object !== undefined) {
      if (object === undefined) {
        return check_authorization(user, subject_or_action_or_tuples, action_or_object);
      } else {
        return check_authorization(subject_or_action_or_tuples, action_or_object, object);
      }
    } else {
      return { result: false, reason: 'Invalid arguments' };
    }
  }

  async function check_authorization_or_fail(
    tuples: (AuthorizationActionTuple | AuthorizationActionTupleWithoutSubject)[],
  ): Promise<void>;
  async function check_authorization_or_fail(
    subject: string,
    action: string,
    object: string,
  ): Promise<void>;
  async function check_authorization_or_fail(
    action: string,
    object: string,
  ): Promise<void>;
  async function check_authorization_or_fail(
    subject_or_action_or_tuples:
      | string
      | (AuthorizationActionTuple | AuthorizationActionTupleWithoutSubject)[],
    action_or_object?: string,
    object?: string,
  ) {
    let result = await (bound_check_authorization as CallableFunction)(
      subject_or_action_or_tuples,
      action_or_object,
      object,
    );
    if (!Array.isArray(result)) {
      result = [result];
    }
    if (result.some((r: AuthorizationResponse) => !r.result)) {
      if (user === 'user:anonymus') {
        throw new UnauthorizedError();
      } else {
        throw new ForbiddenError();
      }
    }
  }

  async function filter<T>(array: T[], action: string, key: (object: T) => string) {
    const authorization_map = await bound_check_authorization(
      array.map(o => ({ action, object: key(o) })),
    );
    return array.filter((_, idx) => authorization_map[idx].result);
  }

  return {
    ...authorization_funs,
    check_authorization: bound_check_authorization,
    check_authorization_or_fail,
    filter,
  };
}

export type BoundAuthorizationFunctions = ReturnType<typeof bind_authorization>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      authorization: ReturnType<typeof bind_authorization> & { user: string };
    }

    export interface Application {
      authorization_mock: undefined | AuthorizationMockConfig;
    }
  }
}

/**
 * This middleware adds the authorization functions to the request object.
 *
 * The user is read from the `X-Request-Authentication` header. If the header is not set, the user is set to `user:anonymus`.
 * @param config
 * @returns
 */
export function middleware(config?: AuthorizationConfig) {
  if (config === undefined) {
    config = {
      AUTHORIZATION_SERVER:
        process.env.AUTHORIZATION_SERVER ||
        die('Environment variable AUTHORIZATION_SERVER must be set'),
      AUTHORIZATION_PSK:
        process.env.AUTHORIZATION_PSK ||
        die('Environment variable AUTHORIZATION_PSK must be set'),
    };
  }

  let authorization_funs = authorization_functions(config);
  return ((req, _res, next) => {
    const user = req.header('X-Request-Authentication') ?? 'user:anonymus';
    let user_id = user;
    try {
      user_id = decodeJwt(user).sub ?? 'user:anonymus';
    } catch (e) {
      //ignore
    }

    if (req.app.authorization_mock) {
      authorization_funs = mock_authorization_functions(req.app.authorization_mock);
    }
    req.authorization = {
      ...bind_authorization(authorization_funs, user),
      user: user_id,
    };

    next();
  }) as express.RequestHandler;
}
