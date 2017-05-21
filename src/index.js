// @flow

import 'normalize.css';
import ReactDOM from 'react-dom';

import * as ls from 'lib/localStorage';

ls.reset();

import Base from './Base';
import Router from './Router';
import bootstrapTooltip from 'lib/tooltip';
import attachFastClick from 'fastclick';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Base>
    <Router />
  </Base>,
  document.getElementById('root')
);

attachFastClick.attach(document.body);
bootstrapTooltip();
registerServiceWorker();
