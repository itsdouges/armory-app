// @flow

import type { EmbedProps } from 'embeds/bootstrap';

import React from 'react';
import Specializations from 'embeds/components/Specializations';
import { makeAttribute } from 'embeds/bootstrap';

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
