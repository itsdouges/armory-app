// @flow

import { Link } from 'react-router';
import cx from 'classnames';

import styles from './styles.less';

const Tab = ({
  selected,
  name,
  index,
  onClick,
  to,
}: { selected: boolean, name: string, index: number, to?: string, onClick?: Function }) => (
  <Link
    to={`${to || ''}`}
    onClick={() => onClick && onClick(index)}
    className={cx(styles.tab, { [styles.selected]: selected })}
  >
    {name}
  </Link>
);

export default Tab;
