// @flow

import ReactDOM from 'react-dom';
import Router from './Router';
import Base from './Base';

ReactDOM.render(
  <Base>
    <Router />
  </Base>,
  document.getElementById('root')
);
