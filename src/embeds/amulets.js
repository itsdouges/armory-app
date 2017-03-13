// @flow

import type { EmbedProps } from './bootstrap';

import Amulets from './components/Amulets';

export default function (element: HTMLElement, ids: Array<number>) {
  return (props: EmbedProps) => <Amulets {...props} ids={ids} />;
}
