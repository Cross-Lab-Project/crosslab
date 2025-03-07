import { fetch } from '../fetch.js';

export type AuthorizationActionTuple = {
  subject: string;
  action: string;
  object: string;
};
export type AuthorizationRelationTuple = {
  subject: string;
  relation: string;
  object: string;
};
export type AuthorizationConfig = {
  AUTHORIZATION_SERVER: string;
  AUTHORIZATION_PSK: string;
};
export type AuthorizationResponse = { result: boolean; reason?: string };

export function authorization_functions(config: AuthorizationConfig) {
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
    const response = await fetch(config.AUTHORIZATION_SERVER + '/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization-PSK': config.AUTHORIZATION_PSK,
      },
      body: JSON.stringify(tuples),
    });
    if (response.status === 200) {
      const result = await response.json();
      if (Array.isArray(subject_or_tuple)) {
        return result.map((r: { result: boolean; reason: string }) => ({
          result: r.result ?? false,
          reason: r.reason,
        }));
      } else {
        return { result: result[0].result ?? false, reason: result[0].reason };
      }
    } else {
      throw new Error(
        `Unexpected Status Code from Authorization Server: ${response.status}`,
      );
    }
  }

  async function update_relations(
    add: AuthorizationRelationTuple[],
    remove: AuthorizationRelationTuple[],
  ): Promise<void> {
    const result = await fetch(config.AUTHORIZATION_SERVER + '/relations/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization-PSK': config.AUTHORIZATION_PSK,
      },
      body: JSON.stringify({ add, remove }),
    });
    if (result.status !== 200) {
      throw new Error(await result.text());
    }
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
    subject: string | undefined,
    relation: string | undefined,
    object: string,
  ): Promise<AuthorizationRelationTuple[]> {
    const response = await fetch(config.AUTHORIZATION_SERVER + '/relations/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization-PSK': config.AUTHORIZATION_PSK,
      },
      body: JSON.stringify({ subject, relation, object }),
    });
    if (response.status === 200) {
      return (await response.json()) ?? [];
    } else {
      throw new Error(await response.text());
    }
  }

  return { check_authorization, update_relations, relate, unrelate, query };
}
