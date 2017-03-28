// @flow

import * as ls from 'lib/localStorage';

ls.reset();

// Base is deliberately at the top.
import Base from '../Base';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import axios from 'axios';
import T from 'i18n-react';

import { addStyleSheet } from 'lib/dom';
import { set as setLang } from 'lib/i18n';
import Tooltip from 'common/components/Tooltip';
import styles from './styles.less';

type Options = {
  lang: string,
  showBadge: boolean,
};

export type EmbedProps = {
  className: string,
  blankText: string,
};

const makeClassName = (str) => `gw2a-${str}-embed`;
export const makeAttribute = (str: string) => `data-armory-${str}`;

function fetchStyles () {
  axios
    // $FlowFixMe
    .get(`${__webpack_public_path__}manifest.json`)
    .then((response) => addStyleSheet(`${__webpack_public_path__}${response.data['gw2aEmbeds.css']}`));
}

function setOptions () {
  const options: Options = {
    lang: 'en',
    // $FlowFixMe
    ...document.GW2A_EMBED_OPTIONS,
  };

  return options;
}

function bootstrapEmbeds () {
  if (!document.body) {
    throw new Error('Document body not loaded!');
  }

  const embedables = Array.from(document.body.querySelectorAll(`[${makeAttribute('embed')}]`));
  embedables.forEach((element) => {
    const embedName = element.getAttribute(makeAttribute('embed'));
    if (!embedName) {
      return;
    }

    const blankText = element.getAttribute(makeAttribute('blank-text')) || T.translate('words.optional');
    const rawIds = element.getAttribute(makeAttribute('ids'));
    const ids = (rawIds || '').split(',');

    // NOTE: The following require is giving major headaches when using
    // inline .spec.js files (as they're added to the webpack context).
    // Watch out!
    // eslint-disable-next-line import/no-webpack-loader-syntax
    const load = require(`promise?global!embeds/creators/${embedName}`);
    load().then(({ default: createEmbed }) => {
      const Component = createEmbed(element, ids);

      ReactDOM.render(
        <Base>
          <Component
            className={cx(styles.embed, makeClassName(embedName))}
            blankText={blankText}
          />
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
      <Tooltip showBadge className={cx(styles.embed, makeClassName('tooltip'))} />
    </Base>,
    tooltipContainer
  );
}

export default function bootstrap () {
  const options = setOptions();

  setLang(options.lang);
  fetchStyles();
  bootstrapEmbeds();
  bootstrapTooltip();
}
