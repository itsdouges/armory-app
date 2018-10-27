// @flow

import Base from '../Base';
import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'common/components/Tooltip';

import type { Props } from 'common/components/Tooltip';

export default function bootstrapTooltip(props: Props = {}) {
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
