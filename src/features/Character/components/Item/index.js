// @flow

import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

type Props = {
  type: string,
  busy: boolean,
  name: boolean,
  item: {
    icon?: string,
  },
  skin: {
    icon?: string,
  },
  upgrades: [],
  infusions: [],
  stats: {},
  upgradeCounts: {},
  hide: boolean,
  small: boolean,
  size: 'micro' | 'small',
  tooltipType: string,
};

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
  tooltipType,
}: Props) => {
  if (hide) return null;

  return (
    <TooltipTrigger
      type={tooltipType || 'items'}
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
          style={{ backgroundImage: `url(${skin.icon || item.icon || ''})` }}
        />
      </div>
    </TooltipTrigger>
  );
};

export default Item;
