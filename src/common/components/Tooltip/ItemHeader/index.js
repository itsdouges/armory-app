// @flow

import cx from 'classnames';

import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';
import styles from './styles.less';

type Props = {
  icon: string,
  name: string,
  rarity: string,
};

const ItemHeader = ({ icon, name, rarity }: Props) => (
  <div className={styles.itemHeader}>
    <Icon size="mini" src={icon} className={styles.tooltipIcon} />
    <span className={cx(styles.itemName, rarity && colours[rarity.toLowerCase()])}>
      {name}
    </span>
  </div>
);

export default ItemHeader;
