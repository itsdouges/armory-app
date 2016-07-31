import { PropTypes } from 'react';
import styles from './styles.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Message = ({ children, type }) => (
  <div className={cx('container', type)}>
    {children}
  </div>
);

Message.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
};

export default Message;
