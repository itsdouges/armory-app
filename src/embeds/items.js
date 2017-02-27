// @flow

import ReactDOM from 'react-dom';

import createEmbed from './embedDecorator';
import qs from 'lib/qs';
import Items from './components/Items';

const ids = qs('ids');
const ItemsEmbed = createEmbed(`Items Embed | ${ids}`)(Items);

ReactDOM.render(
  <ItemsEmbed ids={ids.split(',').map((id) => +id)} />,
  document.getElementById('root')
);
