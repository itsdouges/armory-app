// @flow

import Items from './components/Items';

export default function (element: HTMLElement, ids: Array<number>) {
  return (props: any) => <Items {...props} ids={ids} />;
}
