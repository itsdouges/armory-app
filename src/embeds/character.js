// @flow

import ReactDOM from 'react-dom';
import createEmbed from './embedDecorator';
import Character from './components/Character';
import qs from 'lib/qs';

const characterName = qs('name');
const CharacterEmbed = createEmbed(`Character Embed | ${characterName}`)(Character);

ReactDOM.render(
  <CharacterEmbed name={characterName} />,
  document.getElementById('root')
);
