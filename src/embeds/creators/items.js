// @flow

import type { EmbedProps } from 'embeds/bootstrap';

import React from 'react';
import Items from 'embeds/components/Items';

const extractAttr = (element, key, ids) => {
  return ids.map((id) => {
    const rawId = element.getAttribute(`data-armory-${id}-${key}`);
    if (!rawId) {
      return {};
    }

    return { [id]: parseInt(rawId, 10) };
  })
  .reduce((map, next) => Object.assign(map, next), {});
};

export default function (element: HTMLElement, ids: Array<number>) {
  const statIds = extractAttr(element, 'stat', ids);
  const skinIds = extractAttr(element, 'skin', ids);

  return (props: EmbedProps) => <Items {...props} ids={ids} statIds={statIds} skinIds={skinIds} />;
}
