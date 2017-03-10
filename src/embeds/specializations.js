// @flow

import Specializations from './components/Specializations';

export default function (element: HTMLElement, ids: Array<number>) {
  const traitIds = ids.map((id) => {
    const rawId = element.getAttribute(`data-armory-${id}-traits`);
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

  return (props: any) => <Specializations {...props} specs={specs} />;
}
