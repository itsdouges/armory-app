// @flow

import type { EmbedProps } from 'embeds/bootstrap';
import Character from 'embeds/components/Character';

import { makeAttribute } from 'embeds/bootstrap';

export default function (element: HTMLElement) {
  const name = element.getAttribute(makeAttribute('name')) || '';
  return (props: EmbedProps) => <Character {...props} name={name} />;
}
