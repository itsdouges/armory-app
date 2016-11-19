// @flow

import { Component } from 'react';
import { languages, set, get } from 'lib/i18n';
import cx from 'classnames';

import styles from './styles.less';

export default class LangPicker extends Component {
  state = {
    selected: get(),
  };

  pick (lang: string) {
    window.localStorage.clear();
    set(lang);
    window.location.reload();
  }

  render () {
    return (
      <span>
        <hr className={styles.hr} />

        <div className={styles.root}>

          {languages.map((lang) =>
            <a
              key={lang}
              className={cx(styles.lang, { [styles.selected]: this.state.selected === lang })}
              onClick={() => this.pick(lang)}
            >
              {lang}
            </a>)}
        </div>
      </span>
    );
  }
}
