// @flow

import type { Node } from 'react';

import React from 'react';
import styles from './styles.less';
import cx from 'classnames';

type ContainerProps = {
  className?: string,
  children: Node,
  tag: string,
};

const Container = ({ className, children, tag: Tag, ...props }: ContainerProps) => (
  <Tag {...props} className={cx(styles.container, className)}>
    {children}
  </Tag>
);

Container.defaultProps = {
  tag: 'div',
};

export default Container;
