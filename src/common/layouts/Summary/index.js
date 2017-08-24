// @flow

import type { Node } from 'react';

import React from 'react';
import cx from 'classnames';

import styles from './styles.less';
import Icon from 'common/components/Icon';

type Props = {
  className?: string,
  leftIcon?: any,
  title: Node,
  subTitle: Node,
};

const Summary = ({ className, leftIcon, title, subTitle }: Props) => (
  <div className={cx(className, styles.root)}>
    <div className={styles.icon}>
      <Icon {...leftIcon} />
    </div>

    <div className={styles.content}>
      <span className={styles.title}>{title}</span>
      {subTitle}
    </div>
  </div>
);

export default Summary;
