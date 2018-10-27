// @flow

import React from 'react';

import styles from './styles.less';
import cx from 'classnames';

type MessageProps = {
  type?: string,
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
    <div title={title} className={cx(styles.root, className, styles[type], styles[size])}>
      {children}
    </div>
  );
};

export default Message;
