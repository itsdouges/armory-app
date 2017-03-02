// @flow

// TODO: Remove character.js and replace with this to use in new system.
import Character from './components/Character';

export default function (element: HTMLElement) {
  const name = element.getAttribute('data-armory-name');
  return () => <Character name={name} />;
}
