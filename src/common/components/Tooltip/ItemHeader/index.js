import { PropTypes } from 'react';
import cx from 'classnames';

import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';
import styles from './styles.less';

const ItemHeader = ({ icon, name, rarity }) => (
  <div className={styles.itemHeader}>
    <Icon size="mini" src={icon} className={styles.tooltipIcon} />
    <span className={cx(styles.itemName, rarity && colours[rarity.toLowerCase()])}>
      {name}
    </span>
  </div>
);

ItemHeader.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  rarity: PropTypes.string,
};

export default ItemHeader;
