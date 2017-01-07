// @flow

import { Link } from 'react-router';
import cx from 'classnames';

import Flair from 'common/components/Flair';
import styles from './styles.less';

export type Tab$Props = {
  name: string,
  selected?: boolean,
  index?: number,
  to?: string,
  onClick?: Function,
  flair?: 'new',
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
    {flair ? <Flair type={flair}>{name}</Flair> : name}
  </Link>
);

export default Tab;
