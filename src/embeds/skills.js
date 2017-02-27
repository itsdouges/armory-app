// @flow

import ReactDOM from 'react-dom';
import createEmbed from './createEmbed';
import qs from 'lib/qs';
import Skills from './components/Skills';

const ids = qs('ids');
const SkillsEmbed = createEmbed(`Skills Embed | ${ids}`)(Skills);

ReactDOM.render(
  <SkillsEmbed ids={ids.split(',').map((id) => +id)} />,
  document.getElementById('root')
);
