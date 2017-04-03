// @flow

import type { Props } from './';

import cx from 'classnames';
import styles from './styles.less';

const Placeholder = ({ className, rightComponent, size = 'small' }: Props) => (
  <div className={cx(styles.root, className, styles[size])}>
    <div className={cx(styles.image, styles.placeholder)} />
    <div className={styles.textContainer}>
      <div className={cx(styles.title, styles.placeholder)}>Loading...</div>
      <div className={cx(styles.subTitle, styles.placeholder)}>Quaagan are working...</div>
    </div>

    {rightComponent}
  </div>
);

export default Placeholder;
