// @flow

import React from 'react';
import styles from './styles.less';

type Props = {
  type: 'new',
  children?: any,
};

const Flair = ({ type, children }: Props) => (
  <span className={styles[type]}>
    {children}
  </span>
);

export default Flair;
