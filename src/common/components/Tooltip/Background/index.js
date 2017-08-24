// @flow

import React from 'react';
import cx from 'classnames';

import styles from './styles.less';

type Props = {
  children?: any,
  className?: string,
};

const Background = ({ children, className }: Props) => (
  <div className={cx(styles.root, className)}>
    {children}
  </div>
);

export default Background;
