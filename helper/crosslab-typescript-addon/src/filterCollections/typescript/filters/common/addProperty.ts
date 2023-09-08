import { Filter } from '@cross-lab-project/openapi-codegen';

function addProperty(
  object: { [k: string]: object },
  propertyName: string,
  value: object,
) {
  object[propertyName] = value;
}

export const addPropertyFilter: Filter = {
  name: 'addProperty',
  function: addProperty,
};
