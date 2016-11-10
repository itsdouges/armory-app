// @flow

import ReactDOM from 'react-dom';
import Routes from './routes';
import Base from './base';

ReactDOM.render(
  <Base>
    <Routes />
  </Base>,
  document.getElementById('root')
);
