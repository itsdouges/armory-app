// @flow

import ReactDOM from 'react-dom';

import qs from 'lib/qs';
import { pageView } from 'lib/tracking';
import Head from 'common/components/Head';
import Tooltip from 'common/components/Tooltip';
import Base from '../base';
import Items from './components/Items';

const ids = qs('ids');

ReactDOM.render(
  <Base>
    <div>
      <Head title={`Items Embed | ${ids}`} />
      <Items ids={ids.split(',').map((id) => +id)} />
      <Tooltip />
    </div>
  </Base>,
  document.getElementById('root')
);

pageView();
