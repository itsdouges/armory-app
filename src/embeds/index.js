// @flow

import Base from '../Base';
import ReactDOM from 'react-dom';
import Tooltip from 'common/components/Tooltip';

function bootstrapEmbeds () {
  if (!document.body) {
    throw new Error('Document body not loaded!');
  }

  const embedables = Array.from(document.body.querySelectorAll('[data-armory-embed]'));
  embedables.forEach((element) => {
    let embedName = element.getAttribute('data-armory-embed');
    const rawIds = element.getAttribute('data-armory-ids');

    if (embedName === 'character') {
      embedName = 'characterNew';
    }

    const ids = (rawIds || '').split(',');

    require([`embeds/${embedName}`], ({ default: bootstrapEmbed }) => {
      const Component = bootstrapEmbed(element, ids);

      ReactDOM.render(
        <Base>
          <Component />
        </Base>,
        element
      );
    });
  });
}

function bootstrapTooltip () {
  const tooltipContainer = document.createElement('div');
  if (!document.body) {
    throw new Error('Document body not loaded!');
  }

  document.body.appendChild(tooltipContainer);

  ReactDOM.render(
    <Base>
      <Tooltip showBadge />
    </Base>,
    tooltipContainer
  );
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapEmbeds();
  bootstrapTooltip();
});
