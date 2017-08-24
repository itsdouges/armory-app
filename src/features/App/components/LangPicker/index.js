// @flow

import React, { Component } from 'react';
import { set, get } from 'lib/i18n';
import cx from 'classnames';

import config from 'config';
import SvgIcon from 'common/components/Icon/Svg';
import SelectList from 'common/components/SelectList';

import styles from './styles.less';

function pick (lang: string) {
  window.localStorage.clear();
  set(lang);
  window.location.reload();
}

type State = {
  selected: string,
};

export default class LangPicker extends Component<{}, State> {
  state = {
    selected: get(),
  };

  render () {
    const iconName = config.features.christmas ? 'globe-white' : 'globe';

    return (
      <SelectList icon={<SvgIcon name={iconName} size="micro" />}>
        {config.i18n.languages.map(({ short, long }) =>
          <button
            key={short}
            className={cx(styles.lang, { [styles.selected]: this.state.selected === short })}
            onClick={() => pick(short)}
          >
            {long}
          </button>)
        }
      </SelectList>
    );
  }
}
