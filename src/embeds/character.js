// @flow

import type { EmbedProps } from './bootstrap';
import Character from './components/Character';

import { makeAttribute } from './bootstrap';

export default function (element: HTMLElement) {
  const name = element.getAttribute(makeAttribute('name')) || '';
  return (props: EmbedProps) => <Character {...props} name={name} />;
}
