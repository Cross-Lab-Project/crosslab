import { AuthorizationActionTuple, AuthorizationResponse, AuthorizationRelationTuple, authorization_functions } from './authorization.js';

export type AuthorizationMockConfigItem = Partial<AuthorizationActionTuple> & {result: boolean; reason?: string};
export type AuthorizationMockConfig = AuthorizationMockConfigItem[];

export function mock_authorization_functions(config: AuthorizationMockConfig): ReturnType<typeof authorization_functions> {
  function match(tuple: AuthorizationActionTuple){
    for (const item of config){
      if(item.subject && item.subject!==tuple.subject) continue;
      if(item.action && item.action!==tuple.action) continue;
      if(item.object && item.object!==tuple.object) continue;
      return {result: item.result, reason: item.reason};
    }
    return {result: false, reason: 'No match'};
  }

  async function check_authorization(tuples: AuthorizationActionTuple[]): Promise<AuthorizationResponse[]>;
  async function check_authorization(subject: string, action: string, object: string): Promise<AuthorizationResponse>;
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tuples = [{subject: subject_or_tuple, action: action!, object: object!}];
    }
    const result = tuples.map(match);
    if (Array.isArray(subject_or_tuple)) {
    return result.map((r: {result: boolean; reason?: string}) => ({result: r.result ?? false, reason: r.reason}));
    } else {
    return {result: result[0].result ?? false, reason: result[0].reason};
    }
  }

  async function update_relations(_add: AuthorizationRelationTuple[], _remove: AuthorizationRelationTuple[]): Promise<void> {
    throw Error("Not implemented");
  }

  async function relate(tuples: AuthorizationRelationTuple[]): Promise<void>;
  async function relate(subject: string, relation: string, object: string): Promise<void>;
  async function relate(_subject_or_tuples: string | AuthorizationRelationTuple[], _relation?: string, _object?: string): Promise<void> {
    throw Error("Not implemented");
  }

  async function unrelate(tuples: AuthorizationRelationTuple[]): Promise<void>;
  async function unrelate(subject: string, relation: string, object: string): Promise<void>;
  async function unrelate(_subject_or_tuples: string | AuthorizationRelationTuple[], _relation?: string, _object?: string): Promise<void> {
    throw Error("Not implemented");
  }

  async function query(_subject: string | undefined, _relation: string | undefined, _object: string): Promise<AuthorizationRelationTuple[]> {
    throw Error("Not implemented");
  }

  return {check_authorization, update_relations, relate, unrelate, query};
}
