import { PropTypes } from 'react';
import styles from './styles.less';
import cx from 'classnames';

const Container = ({ className, ...props }) => (
  <div {...props} className={cx(styles.container, className)}>
    {props.children}
  </div>
);

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Container;
