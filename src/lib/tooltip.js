// @flow

import Base from '../Base';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from 'armory-component-ui';

import type { TooltipProps as Props } from 'armory-component-ui';

export default function bootstrapTooltip (props: Props = {}) {
  const tooltipContainer = document.createElement('div');
  if (!document.body) {
    throw new Error('Document body not loaded!');
  }

  document.body.appendChild(tooltipContainer);

  ReactDOM.render(
    <Base>
      <Tooltip {...props} />
    </Base>,
    tooltipContainer
  );
}
