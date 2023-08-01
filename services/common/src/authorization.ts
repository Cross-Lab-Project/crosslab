export type AuthorizationActionTuple = {subject: string; action: string; object: string};
export type AuthorizationRelationTuple = {subject: string; relation: string; object: string};
export type AuthorizationConfig = {AUTHORIZATION_SERVER: string; AUTHORIZATION_PSK: string}

export function authorization_functions(config: AuthorizationConfig) {
  async function check_authorization(tuples: AuthorizationActionTuple[]): Promise<boolean[]>;
  async function check_authorization(subject: string, action: string, object: string): Promise<boolean>;
  async function check_authorization(
    subject_or_tuple: string | AuthorizationActionTuple[],
    action?: string,
    object?: string,
  ): Promise<boolean | boolean[]> {
    let tuples: AuthorizationActionTuple[];
    if (Array.isArray(subject_or_tuple)) {
      tuples = subject_or_tuple;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tuples = [{subject: subject_or_tuple, action: action!, object: object!}];
    }
    const response = await fetch(config.AUTHORIZATION_SERVER + '/authorize', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-Authorization-PSK': config.AUTHORIZATION_PSK},
      body: JSON.stringify(tuples),
    });
    if (response.status === 200) {
      return (await response.json()).result ?? false;
    } else {
      throw new Error(await response.text());
    }
  }

  async function update_relations(add: AuthorizationRelationTuple[], remove: AuthorizationRelationTuple[]): Promise<void> {
    const result = await fetch(config.AUTHORIZATION_SERVER + '/relations/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-Authorization-PSK': config.AUTHORIZATION_PSK},
      body: JSON.stringify({add, remove}),
    });
    if (result.status !== 200) {
      throw new Error(await result.text());
    }
  }

  async function relate(tuples: AuthorizationRelationTuple[]): Promise<void>
  async function relate(subject: string, relation: string, object: string): Promise<void>
  async function relate(subject_or_tuples: string | AuthorizationRelationTuple[], relation?: string, object?: string): Promise<void> {
    let tuples: AuthorizationRelationTuple[];
    if (Array.isArray(subject_or_tuples)) {
      tuples = subject_or_tuples;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tuples = [{subject: subject_or_tuples, relation: relation!, object: object!}];
    }
    await update_relations(tuples, []);
  }

  async function unrelate(tuples: AuthorizationRelationTuple[]): Promise<void>
  async function unrelate(subject: string, relation: string, object: string): Promise<void>
  async function unrelate(subject_or_tuples: string | AuthorizationRelationTuple[], relation?: string, object?: string): Promise<void> {
    let tuples: AuthorizationRelationTuple[];
    if (Array.isArray(subject_or_tuples)) {
      tuples = subject_or_tuples;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tuples = [{subject: subject_or_tuples, relation: relation!, object: object!}];
    }
    await update_relations([], tuples);
  }

  async function query(subject: string | undefined, relation: string | undefined, object: string): Promise<AuthorizationRelationTuple[]> {
    const response = await fetch(config.AUTHORIZATION_SERVER + '/relations/query', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-Authorization-PSK': config.AUTHORIZATION_PSK},
      body: JSON.stringify({subject, relation, object}),
    });
    if (response.status === 200) {
      return (await response.json()).result ?? [];
    } else {
      throw new Error(await response.text());
    }
  }

  return {check_authorization, update_relations, relate, unrelate, query};
}
