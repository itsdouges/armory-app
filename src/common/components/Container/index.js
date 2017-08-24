// @flow

import type { Node } from 'react';

import React from 'react';
import styles from './styles.less';
import cx from 'classnames';

type ContainerProps = {
  className?: string,
  children: Node,
};

const Container = ({ className, children, ...props }: ContainerProps) => (
  <div {...props} className={cx(styles.container, className)}>
    {children}
  </div>
);

export default Container;
