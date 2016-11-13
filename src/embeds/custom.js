// @flow

import ReactDOM from 'react-dom';

import Base from '../base';
import Custom from './components/Custom';
import Tooltip from 'common/components/Tooltip';
import qs from 'lib/qs';
import { pageView } from 'lib/tracking';

function readPropsFromQs (): Object {
  const props = ['userName', 'characterName'];

  return props.reduce((obj, prop) => {
    // eslint-disable-next-line no-param-reassign
    obj[prop] = qs(prop);
    return obj;
  }, {});
}

ReactDOM.render(
  <Base>
    <div>
      <Custom {...readPropsFromQs()} mode="pvp" characterComponents={qs('cc').split(',')} />
      <Tooltip />
    </div>
  </Base>,
  document.getElementById('root')
);

pageView();
