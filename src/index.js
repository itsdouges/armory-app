// @flow

import { reset as resetLocalStorage } from 'lib/localStorage';

resetLocalStorage();

import ReactDOM from 'react-dom';
import Router from './Router';
import Base from './Base';

ReactDOM.render(
  <Base>
    <Router />
  </Base>,
  document.getElementById('root')
);
