// @flow

import { Link } from 'react-router';
import cx from 'classnames';

import decoration from 'common/styles/decoration.less';
import styles from './styles.less';

export type Tab$Props = {
  name: string,
  selected?: boolean,
  index?: number,
  to?: string,
  onClick?: Function,
  flair?: 'new' | 'updated',
};

const Tab = ({
  selected,
  name,
  index,
  onClick,
  to,
  flair,
}: Tab$Props) => (
  <Link
    to={`${to || ''}`}
    onClick={() => onClick && onClick(index)}
    className={cx(styles.tab, { [styles.selected]: selected })}
  >
    {flair ? <span className={decoration[flair]}>{name}</span> : name}
  </Link>
);

export default Tab;
