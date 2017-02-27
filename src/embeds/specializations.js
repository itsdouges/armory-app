// @flow

import ReactDOM from 'react-dom';

import createEmbed from './createEmbed';
import qs from 'lib/qs';
import Specializations from './components/Specializations';

const ids = qs('ids');
const SpecializationsEmbed = createEmbed(`Specializations Embed | ${ids}`)(Specializations);

const specs = ids.split(',').map((id) => ({
  id: +id,
  traits: qs(id).split(',').map((traitId) => +traitId),
}));

ReactDOM.render(
  <SpecializationsEmbed specs={specs} />,
  document.getElementById('root')
);
