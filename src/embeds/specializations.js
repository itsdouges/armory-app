// @flow

import ReactDOM from 'react-dom';

import qs from 'lib/qs';
import { pageView } from 'lib/tracking';
import Head from 'common/components/Head';
import Tooltip from 'common/components/Tooltip';
import ArmoryBadge from 'common/components/ArmoryBadge';

import Base from '../Base';
import Specializations from './components/Specializations';

const ids = qs('ids');

const specs = ids.split(',').map((id) => ({
  id: +id,
  traits: qs(id).split(',').map((traitId) => +traitId),
}));

ReactDOM.render(
  <Base>
    <div>
      <Head title={`Specializations Embed | ${ids}`} />
      <ArmoryBadge />
      <Specializations specs={specs} />
      <Tooltip />
    </div>
  </Base>,
  document.getElementById('root')
);

pageView();
