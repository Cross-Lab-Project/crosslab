import { authorization } from '@crosslab/service-common';

export async function getViewerOwner(
  authorizationFuns: ReturnType<typeof authorization.authorization_functions>,
  object: string,
) {
  const tuples = await authorizationFuns.query(undefined, undefined, object);
  const user_tuples = tuples.filter(t => t.subject.startsWith('user:'));

  const viewer = user_tuples
    .filter(t => t.relation === 'viewer')
    .map(t => t.subject.slice(5));
  const owner = user_tuples
    .filter(t => t.relation === 'owner')
    .map(t => t.subject.slice(5));

  return { viewer, owner };
}

export async function setViewerOwner(
  authorizationFuns: ReturnType<typeof authorization.authorization_functions>,
  viewer: string[] | undefined,
  owner: string[] | undefined,
  object: string,
) {
  const existing_tuples = await getViewerOwner(authorizationFuns, object);

  const viewer_to_add = viewer?.filter(v => !existing_tuples.viewer.includes(v)) ?? [];
  const viewer_to_remove = viewer
    ? existing_tuples.viewer.filter(v => !viewer.includes(v))
    : [];
  const owner_to_add = owner?.filter(o => !existing_tuples.owner.includes(o)) ?? [];
  const owner_to_remove = owner
    ? existing_tuples.owner.filter(o => !owner.includes(o))
    : [];

  const subject_to_tuple = (relation: string) => (subject: string) => ({
    subject: `user:${subject}`,
    relation,
    object,
  });

  authorizationFuns.update_relations(
    [
      ...viewer_to_add.map(subject_to_tuple('viewer')),
      ...owner_to_add.map(subject_to_tuple('owner')),
    ],
    [
      ...viewer_to_remove.map(subject_to_tuple('viewer')),
      ...owner_to_remove.map(subject_to_tuple('owner')),
    ],
  );
}
