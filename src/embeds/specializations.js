// @flow

import type { EmbedProps } from './bootstrap';

import Specializations from './components/Specializations';

import { makeAttribute } from './bootstrap';

export default function (element: HTMLElement, ids: Array<number>) {
  const traitIds = ids.map((id) => {
    const rawId = element.getAttribute(makeAttribute(`${id}-traits`));
    if (!rawId) {
      return [];
    }

    return rawId.split(',').map((traitId) => +traitId);
  })
  .reduce((arr, next) => arr.concat(next), []);

  const specs = ids.map((id) => ({
    id: +id,
    traits: traitIds,
  }));

  return (props: EmbedProps) => <Specializations {...props} specs={specs} />;
}
