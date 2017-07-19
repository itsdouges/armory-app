// @flow

// eslint-disable-next-line
export function thousands (value: number) {
  return value.toString().split('')
    .reverse()
    .reduce((str, char, index) => ((index > 0 && index % 3 === 0) ? `${str},${char}` : `${str}${char}`), '')
    .split('')
    .reverse()
    .join('');
}
