// @flow

import type { Node } from 'react';

import React from 'react';
import styles from './styles.less';

type Props = {
  children: Node,
};

const LoadingStrip = ({ children }: Props) => children || <span className={styles.root}>Loading...</span>;

export default LoadingStrip;
