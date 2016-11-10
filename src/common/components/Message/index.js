// @flow

import styles from './styles.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type MessageProps = {
  type: string,
  title?: string,
  children?: any,
  className?: string,
  size?: string,
};

const Message = ({ children, type, title, className, size }: MessageProps) => {
  if (!children) {
    return null;
  }

  return (
    <div
      title={title}
      className={cx('container', className, type, size)}
    >
        {children}
    </div>
  );
};

export default Message;
