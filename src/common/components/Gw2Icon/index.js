// @flow

import type { IconProps } from 'common/components/Icon';

import Icon from 'common/components/Icon';
import styles from './styles.less';

type Props = IconProps & {
  applyCount?: number,
};

const APPLY_COUNT_THRESHOLD = 1;

const Gw2Icon = ({ applyCount, ...props }: Props) => (
  <Icon {...props}>
    {applyCount && applyCount > APPLY_COUNT_THRESHOLD &&
      <sub className={styles.applyBadge}>{applyCount}</sub>}
  </Icon>
);

export default Gw2Icon;
