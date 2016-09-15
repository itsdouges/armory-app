import { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.less';

const Background = ({ children, className }) => (
  <div className={cx(styles.root, className)}>
    {children}
  </div>
);

Background.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Background;
