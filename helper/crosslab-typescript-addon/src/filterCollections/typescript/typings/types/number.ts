import { Typing } from '../typing';

export function handleNumber(comment: string): Typing {
  return {
    typeDeclaration: 'number',
    typeDependencies: [],
    comment: comment,
  };
}
