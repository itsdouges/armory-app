import { PropTypes } from 'react';
import styles from './styles.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Message = ({ children, type, small, title, className }) => (
  <div title={title} className={cx('container', className, type, {
    small,
  })}>
    {children}
  </div>
);

Message.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
  small: PropTypes.bool,
};

export default Message;
