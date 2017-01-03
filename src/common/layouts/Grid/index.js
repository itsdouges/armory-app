// @flow

import cx from 'classnames';
import styles from './styles.less';

type Props = {
  children?: any,
  className?: string,
  columns?: 'four',
};

const Grid = ({ children, className, columns }: Props) => (
  <div className={cx(styles.root, className, styles[columns])}>
    {children}
  </div>
);

export default Grid;
