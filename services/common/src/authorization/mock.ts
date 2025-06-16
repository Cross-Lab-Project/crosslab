import { Application } from 'express';
import {
  AuthorizationActionTuple,
  AuthorizationRelationTuple,
  AuthorizationResponse,
  authorization_functions,
} from './authorization.js';

export type AuthorizationMockConfigItem = Partial<AuthorizationActionTuple> & {
  result: boolean;
  reason?: string;
};
export type AuthorizationMockConfig = AuthorizationMockConfigItem[];

export type AuthorizationMockLogEntry = {
  add: AuthorizationRelationTuple[];
  remove: AuthorizationRelationTuple[];
};

export function mock_authorization_functions(
  config: AuthorizationMockConfig,
  app: Application,
): ReturnType<typeof authorization_functions> {
  function match(tuple: AuthorizationActionTuple) {
    for (const item of config) {
      if (item.subject && item.subject !== tuple.subject) continue;
      if (item.action && item.action !== tuple.action) continue;
      if (item.object && item.object !== tuple.object) continue;
      return { result: item.result, reason: item.reason };
    }
    return { result: false, reason: 'No match' };
  }

  async function check_authorization(
    tuples: AuthorizationActionTuple[],
  ): Promise<AuthorizationResponse[]>;
  async function check_authorization(
    subject: string,
    action: string,
    object: string,
  ): Promise<AuthorizationResponse>;
  async function check_authorization(
    subject_or_tuple: string | AuthorizationActionTuple[],
    action?: string,
    object?: string,
  ): Promise<AuthorizationResponse | AuthorizationResponse[]> {
    let tuples: AuthorizationActionTuple[];
    if (Array.isArray(subject_or_tuple)) {
      tuples = subject_or_tuple;
      if (tuples.length === 0) {
        return [];
      }
    } else {
       
      tuples = [{ subject: subject_or_tuple, action: action!, object: object! }];
    }
    const result = tuples.map(match);
    if (Array.isArray(subject_or_tuple)) {
      return result.map((r: { result: boolean; reason?: string }) => ({
        result: r.result ?? false,
        reason: r.reason,
      }));
    } else {
      return { result: result[0].result ?? false, reason: result[0].reason };
    }
  }

  async function update_relations(
    add: AuthorizationRelationTuple[],
    remove: AuthorizationRelationTuple[],
  ): Promise<void> {
    app.authorization_mock_log = app.authorization_mock_log ?? [];
    app.authorization_mock_log.push({ add, remove });
  }

  async function relate(tuples: AuthorizationRelationTuple[]): Promise<void>;
  async function relate(subject: string, relation: string, object: string): Promise<void>;
  async function relate(
    subject_or_tuples: string | AuthorizationRelationTuple[],
    relation?: string,
    object?: string,
  ): Promise<void> {
    let tuples: AuthorizationRelationTuple[];
    if (Array.isArray(subject_or_tuples)) {
      tuples = subject_or_tuples;
    } else {
       
      tuples = [{ subject: subject_or_tuples, relation: relation!, object: object! }];
    }
    await update_relations(tuples, []);
  }

  async function unrelate(tuples: AuthorizationRelationTuple[]): Promise<void>;
  async function unrelate(
    subject: string,
    relation: string,
    object: string,
  ): Promise<void>;
  async function unrelate(
    subject_or_tuples: string | AuthorizationRelationTuple[],
    relation?: string,
    object?: string,
  ): Promise<void> {
    let tuples: AuthorizationRelationTuple[];
    if (Array.isArray(subject_or_tuples)) {
      tuples = subject_or_tuples;
    } else {
       
      tuples = [{ subject: subject_or_tuples, relation: relation!, object: object! }];
    }
    await update_relations([], tuples);
  }

  async function query(
    _subject: string | undefined,
    _relation: string | undefined,
    _object: string,
  ): Promise<AuthorizationRelationTuple[]> {
    throw Error('Not implemented');
  }

  return { check_authorization, update_relations, relate, unrelate, query };
}
