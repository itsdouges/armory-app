// @flow

import { Component } from 'react';
import { languages, set, get } from 'lib/i18n';
import cx from 'classnames';

import SvgIcon from 'common/components/Icon/Svg';
import SelectList from 'common/components/SelectList';

import styles from './styles.less';

function pick (lang: string) {
  window.localStorage.clear();
  set(lang);
  window.location.reload();
}

export default class LangPicker extends Component {
  state = {
    selected: get(),
  };

  render () {
    return (
      <SelectList icon={<SvgIcon name="globe" size="micro" />}>
        {languages.map(({ short, long }) =>
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
