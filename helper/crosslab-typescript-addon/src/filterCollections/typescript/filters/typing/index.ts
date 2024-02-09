import { Filter } from '@cross-lab-project/openapi-codegen';

import { destructureSchemaFilter } from './destructureSchema';
import { inlineTypeDeclarationFilter } from './inlineTypeDeclaration';
import { standaloneTypingsFilter } from './standaloneTypings';
import { typeDeclarationFilter } from './typeDeclaration';
import { typeDependenciesFilter } from './typeDependencies';

export const typingFilters: Filter[] = [
  destructureSchemaFilter,
  inlineTypeDeclarationFilter,
  standaloneTypingsFilter,
  typeDeclarationFilter,
  typeDependenciesFilter,
];
