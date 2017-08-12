// @flow

import type { Children } from 'react';

import styles from './styles.less';
import cx from 'classnames';

type ContainerProps = {
  className?: string,
  children?: Children,
};

const Container = ({ className, children, ...props }: ContainerProps) => (
  <div {...props} className={cx(styles.container, className)}>
    {children}
  </div>
);

export default Container;
