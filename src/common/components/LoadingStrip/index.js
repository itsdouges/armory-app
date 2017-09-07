// @flow

import type { Node } from 'react';

import cx from 'classnames';
import React from 'react';
import styles from './styles.less';

type Props = {
  children: Node,
  long?: boolean,
  appearance?: 'default' | 'white',
};

const LoadingStrip = ({ children, long, appearance }: Props) => {
  if (children) {
    return <span>{children}</span>;
  }

  return (
    <span className={cx(styles.root, styles[appearance])}>
      {long ? 'Loading just a sec...' : 'Loading...'}
    </span>
  );
};

export default LoadingStrip;
