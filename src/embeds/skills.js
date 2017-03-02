// @flow

import Skills from './components/Skills';

export default function (element: HTMLElement, ids: Array<number>) {
  return () => <Skills ids={ids} />;
}
