import * as express from 'express';

import {
  AuthorizationActionTuple,
  AuthorizationConfig,
  AuthorizationRelationTuple,
  AuthorizationResponse,
  authorization_functions,
} from './authorization';
import { ForbiddenError, UnauthorizedError } from '../errors';

export type AuthorizationActionTupleWithoutSubject = Omit<AuthorizationActionTuple, 'subject'>;
export type AuthorizationRelationTupleWithoutSubject = Omit<AuthorizationRelationTuple, 'subject'>;

function bind_authorization(authorization_funs: ReturnType<typeof authorization_functions>, user: string) {
  const {check_authorization} = authorization_funs;

  async function bound_check_authorization(
    tuples: (AuthorizationActionTuple | AuthorizationActionTupleWithoutSubject)[],
  ): Promise<AuthorizationResponse[]>;
  async function bound_check_authorization(subject: string, action: string, object: string): Promise<AuthorizationResponse>;
  async function bound_check_authorization(action: string, object: string): Promise<AuthorizationResponse>;
  async function bound_check_authorization(
    subject_or_action_or_tuples: string | (AuthorizationActionTuple | AuthorizationActionTupleWithoutSubject)[],
    action_or_object?: string,
    object?: string,
  ): Promise<AuthorizationResponse | AuthorizationResponse[]> {
    let tuples: AuthorizationActionTuple[];
    if (Array.isArray(subject_or_action_or_tuples)) {
      tuples = subject_or_action_or_tuples.map(tuple => ({subject: user, ...tuple}));
      return check_authorization(tuples);
    } else if (action_or_object !== undefined) {
      if (object === undefined) {
        return check_authorization(user, subject_or_action_or_tuples, action_or_object);
      } else {
        return check_authorization(subject_or_action_or_tuples, action_or_object, object);
      }
    } else {
      return {result: false, reason: 'Invalid arguments'};
    }
  }

  async function check_authorization_or_fail(
    tuples: (AuthorizationActionTuple | AuthorizationActionTupleWithoutSubject)[],
  ): Promise<void>;
  async function check_authorization_or_fail(subject: string, action: string, object: string): Promise<void>;
  async function check_authorization_or_fail(action: string, object: string): Promise<void>;
  async function check_authorization_or_fail(
    subject_or_action_or_tuples: string | (AuthorizationActionTuple | AuthorizationActionTupleWithoutSubject)[],
    action_or_object?: string,
    object?: string,
  ) {
    let result = await (bound_check_authorization as CallableFunction)(subject_or_action_or_tuples, action_or_object, object);
    if (!Array.isArray(result)) {
      result = [result];
    }
    console.log(result);
    if (result.some((r: AuthorizationResponse)  => !r.result)) {
      if (user==='user:anonymus'){
        throw new UnauthorizedError();
      }else{
        throw new ForbiddenError();
      }
    }
  }

  async function filter<T>(array: T[], action: string, key: (object: T) => string) {
    const authorization_map = await bound_check_authorization(array.map(o => ({action, object: key(o)})));
    console.log(authorization_map);
    return array.filter((_, idx) => authorization_map[idx]);
  }

  return {...authorization_funs, check_authorization: bound_check_authorization, check_authorization_or_fail, filter};
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      authorization: ReturnType<typeof bind_authorization>;
    }
  }
}

export function middleware(config: AuthorizationConfig) {
  const authorization_funs = authorization_functions(config);
  return ((req, _res, next) => {
    const user = req.header('X-Request-Authentication') ?? 'user:anonymus';

    req.authorization = bind_authorization(authorization_funs, user);

    next();
  }) as express.RequestHandler;
}
