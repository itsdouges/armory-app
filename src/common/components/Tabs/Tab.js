// @flow

import { NavLink } from 'react-router-dom';

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
  ...props
}: Tab$Props) => (
  <NavLink
    {...props}
    to={path}
    onClick={onClick}
    activeClassName={styles.selected}
    className={styles.tab}
  >
    {flair ? <Flair type={flair}>{name}</Flair> : name}
  </NavLink>
);

export default Tab;
