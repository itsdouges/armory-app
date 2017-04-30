// @flow

import 'normalize.css';
import ReactDOM from 'react-dom';

import * as ls from 'lib/localStorage';

ls.reset();

import Base from './Base';
import Router from './Router';
import bootstrapTooltip from 'lib/tooltip';

ReactDOM.render(
  <Base>
    <Router />
  </Base>,
  document.getElementById('root')
);

bootstrapTooltip();
