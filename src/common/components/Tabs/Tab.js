// @flow

import styles from './styles.less';
import cx from 'classnames';

const Tab = ({
  selected,
  name,
  index,
  onClick,
}: { selected: boolean, name: string, index: number, onClick: Function }) => (
  <button
    onClick={() => onClick(index)}
    className={cx(styles.tab, { [styles.selected]: selected })}
  >
    {name}
  </button>
);

export default Tab;
