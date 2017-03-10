// @flow

import Character from './components/Character';

export default function (element: HTMLElement) {
  const name = element.getAttribute('data-armory-name');
  return (props: any) => <Character {...props} name={name} />;
}
