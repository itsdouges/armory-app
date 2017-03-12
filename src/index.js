// @flow

import * as ls from 'lib/localStorage';

ls.reset();

import ReactDOM from 'react-dom';
import Router from './Router';
import Base from './Base';

ReactDOM.render(
  <Base>
    <Router />
  </Base>,
  document.getElementById('root')
);
