// @flow

import type { EmbedProps } from 'embeds/bootstrap';

import Items from 'embeds/components/Items';

export default function (element: HTMLElement, ids: Array<number>) {
  const statIds = ids.map((id) => {
    const rawId = element.getAttribute(`data-armory-${id}-stat`);
    if (!rawId) {
      return {};
    }

    return { [id]: parseInt(rawId, 10) };
  })
  .reduce((map, next) => Object.assign(map, next), {});
  return (props: EmbedProps) => <Items {...props} ids={ids} statIds={statIds} />;
}
