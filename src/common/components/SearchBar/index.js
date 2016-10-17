import { browserHistory } from 'react-router';
import cx from 'classnames';
import { PropTypes } from 'react';

import styles from './styles.less';
import Textbox from 'common/components/Textbox';
import SvgIcon from 'common/components/Icon/Svg';

function onSearch (event) {
  event.preventDefault();

  const filter = event.nativeEvent.target[1].value;
  if (!filter) {
    return;
  }

  browserHistory.push(`/search/${filter}`);
}

const SearchBar = ({ className, simple, ...props }) => (
  <form {...props} className={cx(styles.root, className)} onSubmit={onSearch}>
    <Textbox
      autoFocus
      required
      placeholder="Search for users, characters, and guilds..."
      containerClassName={cx(styles.textBoxContainer, { [styles.simple]: simple })}
      iconLeft={(
        <button className={styles.searchButton}>
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

SearchBar.propTypes = {
  className: PropTypes.string,
  simple: PropTypes.bool,
};

export default SearchBar;
