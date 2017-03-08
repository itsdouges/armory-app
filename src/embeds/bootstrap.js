// @flow

import { set as setLang } from 'lib/i18n';
import Base from '../Base';
import ReactDOM from 'react-dom';
import Tooltip from 'common/components/Tooltip';
import styles from './styles.less';

function bootstrapEmbeds () {
  if (!document.body) {
    throw new Error('Document body not loaded!');
  }

  const embedables = Array.from(document.body.querySelectorAll('[data-armory-embed]'));
  embedables.forEach((element) => {
    const embedName = element.getAttribute('data-armory-embed');
    const rawIds = element.getAttribute('data-armory-ids');
    const ids = (rawIds || '').split(',');

    // eslint-disable-next-line import/no-webpack-loader-syntax
    const load = require(`promise?global!embeds/${embedName}`);
    load().then(({ default: createEmbed }) => {
      const Component = createEmbed(element, ids);

      ReactDOM.render(
        <Base>
          <span className={styles.embed}>
            <Component />
          </span>
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
      <Tooltip showBadge className={styles.embed} />
    </Base>,
    tooltipContainer
  );
}

type Options = {
  lang: string,
};

function setOptions () {
  // $FlowFixMe
  const options: Options = document.GW2A_EMBED_OPTIONS || {
    lang: 'en',
  };

  setLang(options.lang);
}

export default function bootstrap () {
  setOptions();
  bootstrapEmbeds();
  bootstrapTooltip();
}
