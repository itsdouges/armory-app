// @flow

import type { Children } from 'react';

import cx from 'classnames';
import styles from './styles.less';

type Props = {
  name: string,
  className?: string,
  icon?: Children,
  onClick?: () => void,
  selected?: boolean,
  subCategory?: boolean,
};

const AchievementCategory = ({ name, icon, className, onClick, selected, subCategory }: Props) => (
  <button
    className={cx(styles.root, className, {
      [styles.selected]: selected,
      [styles.subCategory]: subCategory,
    })}
    onClick={onClick}
  >
    <span className={styles.icon}>{icon}</span>
    <span className={styles.name}>{name}</span>
  </button>
);

export default AchievementCategory;
