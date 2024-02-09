import { Typing } from '../typing';

export function handleBoolean(comment: string): Typing {
  return {
    typeDeclaration: 'boolean',
    typeDependencies: [],
    comment: comment,
  };
}
