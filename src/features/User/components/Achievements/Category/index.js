// @flow

import type { Children } from 'react';

import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import styles from './styles.less';

type Props = {
  basePath: string,
  name: string,
  className?: string,
  icon?: Children,
  onClick?: () => void,
  subCategory?: boolean,
  rightComponent?: Children,
};

const AchievementCategory = ({ basePath, name, icon, className, onClick, subCategory, rightComponent }: Props) => (
  <NavLink
    to={`${basePath}/asdasd`}
    onClick={onClick}
    activeClassName={styles.selected}
    className={cx(styles.root, className, {
      [styles.subCategory]: subCategory,
    })}
  >
    <span className={styles.icon}>{icon}</span>
    <span className={styles.name}>
      <span>{name || <span className={styles.loading}>Loading Category...</span>}</span>
      {rightComponent && <span className={styles.rightComponent}>{rightComponent}</span>}
    </span>
  </NavLink>
);

export default AchievementCategory;
