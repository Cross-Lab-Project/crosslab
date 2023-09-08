import { Typing } from '../typing';

export function handleNull(comment: string): Typing {
  return {
    typeDeclaration: 'null',
    typeDependencies: [],
    comment: comment,
  };
}
