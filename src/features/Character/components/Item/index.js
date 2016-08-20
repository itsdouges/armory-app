import { PropTypes } from 'react';
import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Item = ({ type, busy, name, item = {}, skin = {}, upgrades = [] }) => (
  <TooltipTrigger
    type="items"
    data={{
      name,
      item,
      skin,
      upgrades,
    }}
  >
    <div className={cx('root', 'containerDefault', `${type}Icon`, { busy })}>
      <div className={styles.item} style={{ backgroundImage: `url(${skin.icon || item.icon})` }} />
    </div>
  </TooltipTrigger>
);

Item.propTypes = {
  slotName: PropTypes.string,
  type: PropTypes.string,
  showTooltip: PropTypes.func,
  busy: PropTypes.bool,
  item: PropTypes.object,
  skin: PropTypes.object,
  name: PropTypes.string,
  upgrades: PropTypes.array,
};

export default Item;
