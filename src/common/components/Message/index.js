import { PropTypes } from 'react';
import styles from './styles.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Message = ({ children, type, title, className, size }) => (children ? (
  <div
    title={title}
    className={cx('container', className, type, size)}
  >
      {children}
  </div>
) : null);

Message.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
  size: PropTypes.string,
};

export default Message;
