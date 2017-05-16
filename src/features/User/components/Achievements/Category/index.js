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
  rightComponent?: Children,
};

const AchievementCategory = ({ name, icon, className, onClick, selected, subCategory, rightComponent }: Props) => (
  <button
    className={cx(styles.root, className, {
      [styles.selected]: selected,
      [styles.subCategory]: subCategory,
    })}
    onClick={onClick}
  >
    <span className={styles.icon}>{icon}</span>
    <span className={styles.name}>
      <span>{name || <span className={styles.loading}>Loading Category...</span>}</span>
      {rightComponent && <span className={styles.rightComponent}>{rightComponent}</span>}
    </span>
  </button>
);

export default AchievementCategory;
