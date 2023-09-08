import { Typing } from '../typing';

export function handleString(comment: string): Typing {
  return {
    typeDeclaration: 'string',
    typeDependencies: [],
    comment: comment,
  };
}
