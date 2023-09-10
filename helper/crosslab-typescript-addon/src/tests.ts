/**
 * This function tests if the attribute of an object is equal to a given value.
 * @param object The object to be tested.
 * @param attributeAndValue The attribute and the value to be tested.
 * @returns True if the attribute of the object matches the value, else false.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function attributeEqualTo(object: any, attributeAndValue: [string, any]) {
  return object[attributeAndValue[0]] === attributeAndValue[1];
}
