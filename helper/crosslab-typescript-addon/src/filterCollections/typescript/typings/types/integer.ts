import { Typing } from '../typing';

export function handleInteger(comment: string): Typing {
  return {
    typeDeclaration: 'number',
    typeDependencies: [],
    comment: comment,
  };
}
