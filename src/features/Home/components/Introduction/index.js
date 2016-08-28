import { PropTypes } from 'react';

import styles from './styles.less';
import cx from 'classnames';

const Introduction = ({ className, ...props }) => (
  <div {...props} className={cx(styles.root, className)}>
    <h2>What is Guild Wars 2 Armory?</h2>

    <div className={styles.text}>
      Guild Wars 2 Armory is a free utility that you can use to find,
      view, and share Guild Wars 2 user, character, and guild pages.
    </div>
  </div>
);

Introduction.propTypes = {
  className: PropTypes.string,
};

export default Introduction;
