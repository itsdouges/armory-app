import { PropTypes } from 'react';

import styles from './styles.less';
import cx from 'classnames';

const Introduction = ({ className, ...props }) => (
  <div {...props} className={cx(styles.root, className)}>
    <h2>What is Guild Wars 2 Armory?</h2>

    <div className={styles.text}>
      Guild Wars 2 Armory is an easy way to find, view, and
      share users, characters, and guilds with your friends
      on your mobile and PC!
      <br />
      Join today and start sharing!
    </div>
  </div>
);

Introduction.propTypes = {
  className: PropTypes.string,
};

export default Introduction;
