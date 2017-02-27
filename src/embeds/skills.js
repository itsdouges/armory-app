// @flow

import ReactDOM from 'react-dom';

import qs from 'lib/qs';
import { pageView } from 'lib/tracking';
import Head from 'common/components/Head';
import Tooltip from 'common/components/Tooltip';
import ArmoryBadge from 'common/components/ArmoryBadge';

import Base from '../Base';
import Skills from './components/Skills';

const ids = qs('ids');

ReactDOM.render(
  <Base>
    <div>
      <Head title={`Skills Embed | ${ids}`} />
      <ArmoryBadge />
      <Skills ids={ids.split(',').map((id) => +id)} />
      <Tooltip />
    </div>
  </Base>,
  document.getElementById('root')
);

pageView();
