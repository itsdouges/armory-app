// @flow

import type { EmbedProps } from './bootstrap';
import Character from './components/Character';

export default function (element: HTMLElement) {
  const name = element.getAttribute('data-armory-name') || '';
  return (props: EmbedProps) => <Character {...props} name={name} />;
}
