import { PropTypes } from 'react';
import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Item = ({
  type,
  busy,
  name,
  item = {},
  skin = {},
  upgrades = [],
  infusions = [],
  stats = {},
  upgradeCounts = {},
  hide,
  small,
  tooltipTypeOverride,
}) => {
  if (hide) return null;

  return (
    <TooltipTrigger
      type={tooltipTypeOverride || 'items'}
      data={{
        name,
        item,
        skin,
        infusions,
        upgrades,
        upgradeCounts,
        stats,
      }}
    >
      <div className={cx('root', `${type}Icon`, { busy, small })}>
        <div
          className={styles.item}
          style={{ backgroundImage: `url(${skin.icon || item.icon})` }}
        />
      </div>
    </TooltipTrigger>
  );
};

Item.propTypes = {
  slotName: PropTypes.string,
  type: PropTypes.string,
  showTooltip: PropTypes.func,
  busy: PropTypes.bool,
  item: PropTypes.object,
  skin: PropTypes.object,
  infusions: PropTypes.array,
  hide: PropTypes.bool,
  name: PropTypes.string,
  stats: PropTypes.object,
  upgrades: PropTypes.array,
  upgradeCounts: PropTypes.object,
  small: PropTypes.bool,
  tooltipTypeOverride: PropTypes.string,
};

export default Item;
