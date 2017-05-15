// @flow

// eslint-disable-next-line
export function reduceById (payload: Array<*>) {
  return payload.reduce((acc, item) => ({
    ...acc,
    [item.id]: item,
  }), {});
}
