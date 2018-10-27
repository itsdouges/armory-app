// @flow

import React from 'react';
import cx from 'classnames';
import T from 'i18n-react';

import history from 'lib/history';
import styles from './styles.less';
import Textbox from 'common/components/Textbox';
import SvgIcon from 'common/components/Icon/Svg';

function onSearch (event) {
  event.preventDefault();

  const filter = event.nativeEvent.target[0].value;
  if (!filter) {
    return;
  }

  history.push(`/search?q=${filter}`);
}

type SearchBarProps = {
  className?: string,
  simple?: boolean,
};

const SearchBar = ({ className, simple, ...props }: SearchBarProps) => (
  <form {...props} className={cx(styles.root, className)} onSubmit={onSearch}>
    <Textbox
      id={`search${simple ? '-simple' : ''}`}
      label={T.translate('search.textbox')}
      autoFocus
      required
      placeholder={`${T.translate('search.textbox')}...`}
      className={styles.textbox}
      containerClassName={cx(styles.textBoxContainer, { [styles.simple]: simple })}
      iconRight={(
        <button type="submit" className={styles.searchButton}>
          <SvgIcon
            button
            className={cx(styles.searchIcon, { [styles.simple]: simple })}
            name="search-new"
            size="micro"
          />
        </button>
      )}
    />
  </form>
);

export default SearchBar;
