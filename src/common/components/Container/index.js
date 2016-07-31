import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames';

const Container = (props) => (
  <div {...props} className={classnames(styles.container, props.className)}>
    {props.children}
  </div>
);

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Container;
