import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Card = (props) => (
  <div {...props} className={cx('container', props.size, props.className)}>
    {props.children}
  </div>
);

Card.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  background: PropTypes.string,
};

export default Card;
