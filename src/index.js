// @flow

import 'normalize.css';
import ReactDOM from 'react-dom';

import * as ls from 'lib/localStorage';
import Tooltip from 'common/components/Tooltip';

ls.reset();

import Base from './Base';
import Router from './Router';

ReactDOM.render(
  <Base>
    <Router />
  </Base>,
  document.getElementById('root')
);

function bootstrapTooltip () {
  const tooltipContainer = document.createElement('div');
  if (!document.body) {
    throw new Error('Document body not loaded!');
  }

  document.body.appendChild(tooltipContainer);

  ReactDOM.render(
    <Base>
      <Tooltip />
    </Base>,
    tooltipContainer
  );
}

bootstrapTooltip();
