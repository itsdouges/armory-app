// @flow

import type { IconProps } from 'common/components/Icon';

import React from 'react';
import Icon from 'common/components/Icon';
import styles from './styles.less';

type Props = IconProps & {
  applyCount?: number,
  count?: number,
};

const COUNT_THRESHOLD = 1;

const Gw2Icon = ({ applyCount, count, children, ...props }: Props) => (
  <Icon {...props}>
    {applyCount && applyCount > COUNT_THRESHOLD &&
      <sub className={styles.applyBadge}>{applyCount}</sub>}
    {count && count > COUNT_THRESHOLD &&
      <sub className={styles.countBadge}>{count}</sub>}
    {children}
  </Icon>
);

export default Gw2Icon;
