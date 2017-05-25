// @flow

import { Link } from 'react-router-dom';
import cx from 'classnames';

import Flair from 'common/components/Flair';
import styles from './styles.less';

export type Tab$Props = {
  name: string,
  path: string,
  onClick?: Function,
  flair?: 'new',
};

const Tab = ({
  name,
  path,
  onClick,
  flair,
}: Tab$Props) => (
  <Link
    to={path}
    onClick={onClick}
    className={cx(styles.tab, { [styles.selected]: false })}
  >
    {flair ? <Flair type={flair}>{name}</Flair> : name}
  </Link>
);

export default Tab;
