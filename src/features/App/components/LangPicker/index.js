// @flow

import { Component } from 'react';
import { languages, set, get } from 'lib/i18n';
import cx from 'classnames';

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
      <span>
        <hr className={styles.hr} />

        <div className={styles.root}>

          {languages.map((lang) =>
            <button
              key={lang}
              className={cx(styles.lang, { [styles.selected]: this.state.selected === lang })}
              onClick={() => pick(lang)}
            >
              {lang}
            </button>)}
        </div>
      </span>
    );
  }
}
