// @flow

import ReactDOM from 'react-dom';

import Base from '../base';
import Custom from './components/Custom';
import qs from 'lib/qs';
import { pageView } from 'lib/tracking';

pageView();

function readPropsFromQs (): Object {
  const props = ['user', 'character'];

  return props.reduce((obj, prop) => {
    // eslint-disable-next-line no-param-reassign
    obj[prop] = qs(prop);
    return obj;
  }, {});
}

ReactDOM.render(
  <Base>
    <Custom {...readPropsFromQs()} />
  </Base>,
  document.getElementById('root')
);
