// @flow

import Items from './components/Items';

export default function (element: HTMLElement, ids: Array<number>) {
  return () => <Items ids={ids} />;
}
