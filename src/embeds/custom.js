// @flow

import ReactDOM from 'react-dom';

import Base from '../base';
import Custom from './components/Custom';
import Tooltip from 'common/components/Tooltip';
import qs from 'lib/qs';
import { pageView } from 'lib/tracking';

type QueryProp = {
  prop: string,
  queryString: string,
  modify?: () => string,
};

const props = [
  { prop: 'userName', queryString: 'un' },
  { prop: 'characterName', queryString: 'cn' },
  { prop: 'mode', queryString: 'm' },
  { prop: 'height', queryString: 'h' },
  { prop: 'width', queryString: 'w' },
  { prop: 'characterComponents', queryString: 'cc', modify: (string) => string.split(',') },
  { prop: 'quadrants', queryString: 'qd', modify: (string) => string.split('x').map((n) => +n) },
];

function readPropsFromQs (): { [key: string]: any } {
  return props.reduce((obj, { prop, queryString, modify }: QueryProp) => {
    const raw = qs(queryString);
    const value = modify ? modify(raw) : raw;
    // eslint-disable-next-line no-param-reassign
    obj[prop] = value;
    return obj;
  }, {});
}

ReactDOM.render(
  <Base>
    <div>
      <Custom {...readPropsFromQs()} />
      <Tooltip />
    </div>
  </Base>,
  document.getElementById('root')
);

pageView();
