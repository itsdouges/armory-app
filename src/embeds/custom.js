// @flow

import ReactDOM from 'react-dom';

import Base from '../base';
import Custom from './components/Custom';
import Tooltip from 'common/components/Tooltip';
import qs from 'lib/qs';
import { pageView } from 'lib/tracking';
import Head from 'common/components/Head';

type QueryProp = {
  prop: string,
  queryString: string,
  modify?: () => string,
};

const generalProps = [
  { prop: 'userName', queryString: 'un' },
  { prop: 'characterName', queryString: 'cn' },
  { prop: 'mode', queryString: 'm' },
  { prop: 'height', queryString: 'h' },
  { prop: 'width', queryString: 'w' },
  { prop: 'quadrants', queryString: 'qd', modify: (string) => string.split('x').map((n) => +n) },
  {
    prop: 'components',
    queryString: 'c',
    modify: (string) => string.split(',').reduce((obj, definition) => {
      const [quadrantKey, componentName] = definition.split('|');

      if (obj[quadrantKey]) {
        obj[quadrantKey].push(componentName);
      } else {
        // eslint-disable-next-line
        obj[quadrantKey] = [componentName];
      }

      return obj;
    }, {}),
  },
];

function readPropsFromQs (): { [key: string]: any } {
  return generalProps.reduce((obj, { prop, queryString, modify }: QueryProp) => {
    const raw = qs(queryString);
    const value = modify ? modify(raw) : raw;
    // eslint-disable-next-line no-param-reassign
    obj[prop] = value;
    return obj;
  }, {});
}

const props = readPropsFromQs();

const titleArray = [props.characterName, props.userName].filter((prop) => !!prop);

ReactDOM.render(
  <Base>
    <div>
      <Head title={`Custom Embed | ${titleArray.join(' | ')}`} />
      <Custom {...props} />
      <Tooltip />
    </div>
  </Base>,
  document.getElementById('root')
);

pageView();
