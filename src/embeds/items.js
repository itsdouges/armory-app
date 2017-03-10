// @flow

import type { EmbedProps } from './bootstrap';

import Items from './components/Items';

export default function (element: HTMLElement, ids: Array<number>) {
  return (props: EmbedProps) => <Items {...props} ids={ids} />;
}
