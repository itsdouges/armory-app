import { PropTypes } from 'react';
import SimpleTooltip from '../Simple';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import Icon from 'common/components/Icon';

const rarityMapping = {

};

const ItemsTooltip = ({ data: { item, skin, name } }) => {
  if (Object.keys(item).length === 0) {
    return <SimpleTooltip data={name} />;
  }

  return (
    <div>
      <SimpleTooltip data="Current Equipped" />

      <div className="${styles.itemHeader}">
        <Icon size="mini" src={skin.icon || item.icon} className={styles.tooltipIcon} />

        <span className={cx('itemName', rarityMapping[item.rarity])}>
          {item.name}
        </span>
      </div>
    </div>
  );
};

ItemsTooltip.propTypes = {
  data: PropTypes.object,
};

export default ItemsTooltip;
