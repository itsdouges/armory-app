// @flow

import type { EmbedProps } from './bootstrap';

import Skills from './components/Skills';

export default function (element: HTMLElement, ids: Array<number>) {
  return (props: EmbedProps) => <Skills {...props} ids={ids} />;
}
