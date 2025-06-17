export function replacer(_key: string, value: unknown) {
  if (value instanceof Uint8Array) {
    console.log(value, {
      type: 'Uint8Array',
      data: Array.from(value),
    });
    return {
      type: 'Uint8Array',
      data: Array.from(value),
    };
  }
  return value;
}

export function reviver(_key: string, value: unknown) {
  if (
    value &&
    typeof value === 'object' &&
    'type' in value &&
    (value.type === 'Uint8Array' || value.type === 'Buffer')
  ) {
    const result = Uint8Array.from(
      'data' in value && Array.isArray(value.data) ? value.data : [],
    );
    console.log(value, result, result instanceof Uint8Array);
    return result;
  }
  return value;
}
