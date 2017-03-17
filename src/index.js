// @flow

import 'normalize.css';
import ReactDOM from 'react-dom';

import * as ls from 'lib/localStorage';

ls.reset();

import Router from './Router';
import Base from './Base';

ReactDOM.render(
  <Base>
    <Router />
  </Base>,
  document.getElementById('root')
);
