// @flow

import { Link } from 'react-router';
import cx from 'classnames';

import styles from './styles.less';

export type Tab$Props = {
  name: any,
  selected?: boolean,
  index?: number,
  to?: string,
  onClick?: Function,
};

const Tab = ({
  selected,
  name,
  index,
  onClick,
  to,
}: Tab$Props) => (
  <Link
    to={`${to || ''}`}
    onClick={() => onClick && onClick(index)}
    className={cx(styles.tab, { [styles.selected]: selected })}
  >
    {name}
  </Link>
);

export default Tab;
