// @flow

import type { Children } from 'react';

import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import styles from './styles.less';

type Props = {
  to?: string,
  name: string,
  className?: string,
  icon?: Children,
  selected?: boolean,
  subCategory?: boolean,
  rightComponent?: Children,
};

const AchievementCategory = ({ name, icon, className, selected, subCategory, rightComponent, to, onClick }: Props) => {
  const Container = to ? NavLink : 'button';

  const navProps = to ? {
    activeClassName: styles.selected,
    to,
  } : null;

  return (
    <Container
      exact
      {...navProps}
      onClick={onClick}
      className={cx(styles.root, className, {
        [styles.selected]: selected,
        [styles.subCategory]: subCategory,
      })}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.name}>
        <span>{name || <span className={styles.loading}>Loading Category...</span>}</span>
        {rightComponent && <span className={styles.rightComponent}>{rightComponent}</span>}
      </span>
    </Container>
  );
};

export default AchievementCategory;
