// @flow

import Skills from './components/Skills';

export default function (element: HTMLElement, ids: Array<number>) {
  return (props: any) => <Skills {...props} ids={ids} />;
}
