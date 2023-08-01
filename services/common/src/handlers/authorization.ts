import * as express from 'express';

import {AuthorizationActionTuple, AuthorizationConfig, authorization_functions} from '../authorization';

function bind_authorization(authorization_funs: ReturnType<typeof authorization_functions>, user: string) {
  const {check_authorization} = authorization_funs;

  function bound_check_authorization(tuples: AuthorizationActionTuple[]): Promise<boolean[]>;
  function bound_check_authorization(tuples: Omit<AuthorizationActionTuple, 'subject'>[]): Promise<boolean[]>;
  function bound_check_authorization(subject: string, action: string, object: string): Promise<boolean>;
  function bound_check_authorization(action: string, object: string): Promise<boolean>;
  function bound_check_authorization(
    subject_or_action_or_tuples: string | AuthorizationActionTuple[] | Omit<AuthorizationActionTuple, 'subject'>[],
    action_or_object?: string,
    object?: string,
  ): Promise<boolean | boolean[]> {
    let tuples: AuthorizationActionTuple[];
    if (Array.isArray(subject_or_action_or_tuples)) {
      tuples = subject_or_action_or_tuples.map(tuple => ({subject: user, ...tuple}));
      return check_authorization(tuples);
    } else {
      if (object === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return check_authorization(user, subject_or_action_or_tuples, action_or_object!);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return check_authorization(subject_or_action_or_tuples, action_or_object!, object);
      }
    }
  }

  return {...authorization_funs, check_authorization: bound_check_authorization};
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      authorization: ReturnType<typeof bind_authorization>;
    }
  }
}

export function authorization(app: express.Application, config: AuthorizationConfig) {
  const authorization_funs = authorization_functions(config);
  app.use((req, _res, _next) => {
    const user = req.header('X-Request-Authentication') ?? 'user:anonymus';

    req.authorization = bind_authorization(authorization_funs, user);
  });
}
