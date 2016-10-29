import { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.less';

const Summary = ({ className, leftIcon, title, subTitle }) => (
  <div className={cx(className, styles.root)}>
    <div className={styles.icon}>{leftIcon}</div>

    <div className={styles.content}>
      <span className={styles.title}>{title}</span>
      {subTitle}
    </div>
  </div>
);

Summary.propTypes = {
  className: PropTypes.string,
  leftIcon: PropTypes.any,
  title: PropTypes.any,
  subTitle: PropTypes.any,
};

export default Summary;
