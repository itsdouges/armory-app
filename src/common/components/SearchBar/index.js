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

const SearchBar = ({ className, ...props }) => (
  <form {...props} className={cx(styles.root, className)} onSubmit={onSearch}>
    <Textbox
      autoFocus
      required
      placeholder="Search for users, characters, and guilds..."
      containerClassName={styles.textBoxContainer}
      iconLeft={(
        <button className={styles.searchButton}>
          <SvgIcon button className={styles.searchIcon} name="search" size="micro" />
        </button>
      )}
    />
  </form>
);

SearchBar.propTypes = {
  className: PropTypes.string,
};

export default SearchBar;
