// @flow

import ReactDOM from 'react-dom';

import Base from '../base';
import Character from './components/Character';
import qs from 'lib/qs';
import { pageView } from 'lib/tracking';

ReactDOM.render(
  <Base>
    <Character name={qs('name')} />
  </Base>,
  document.getElementById('root')
);

pageView();
